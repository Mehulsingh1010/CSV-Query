'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseClient } from '@/components/supabase-provider'
import { Button } from '@/components/ui/button'

export function UserHeader() {
  const [user, setUser] = useState<any>(null)
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return null

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">CSV Query Interface</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">{user.email}</span>
          <Button onClick={handleLogout} variant="outline" size="sm" className="text-gray-600 hover:text-gray-900 border-gray-300">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

