'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSupabaseClient } from '@/components/supabase-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = useSupabaseClient()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      })

      if (error) throw error

      router.push('/')
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please confirm your verification via Gmail and try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100/50 py-10">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <div className="inline-block">
            <svg
              viewBox="0 0 100 20"
              className="w-32 h-8 mx-auto mb-4"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
              </defs>
              <path
                d="M10 10 Q 25 0, 40 10 T 70 10 T 100 10"
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="4"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
            Welcome Back
          </h1>
        </div>
        
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username or Email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="bg-white/50 text-black"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50 text-black"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm font-medium text-purple-600 hover:text-purple-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>
              
             
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

