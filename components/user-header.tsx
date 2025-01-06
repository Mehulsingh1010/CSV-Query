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
    <header className="bg-background border-b">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CSV Query Interface</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{user.username}</span>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

