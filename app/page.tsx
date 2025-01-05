'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseClient } from '@/components/supabase-provider'
import { FileUpload } from '@/components/file-upload'
import { QueryEditor } from '@/components/query-editor'
import { ResultsTable } from '@/components/results-table'

export default function HomePage() {
  const [session, setSession] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [queryResult, setQueryResult] = useState<string | null>(null)
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (!session) {
        router.push('/login')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) {
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const handleFileUploaded = (fileId: string, data: any) => {
    setSelectedFile({ id: fileId, data })
    const headers = Object.keys(data[0]).join('\t')
    const rows = data.map((row: any) => Object.values(row).join('\t')).join('\n')
    setQueryResult(`${headers}\n${rows}`)
  }

  const handleFileSelected = async (fileId: string) => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('id', fileId)
      .single()

    if (error) {
      console.error('Error fetching file:', error)
      return
    }

    setSelectedFile(data)
    const headers = data.column_names.join('\t')
    const rows = data.sample_data.map((row: any) => Object.values(row).join('\t')).join('\n')
    setQueryResult(`${headers}\n${rows}`)
  }

  const handleQueryResult = (result: string) => {
    setQueryResult(result)
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <FileUpload onFileUploaded={handleFileUploaded} onFileSelected={handleFileSelected} />
        {selectedFile && (
          <>
            <QueryEditor fileId={selectedFile.id} onQueryResult={handleQueryResult} />
            {queryResult && <ResultsTable data={queryResult} />}
          </>
        )}
      </div>
    </div>
  )
}

