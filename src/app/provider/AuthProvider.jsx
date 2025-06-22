'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check auth status on initial load
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('https://task-management-server-softvence-steel.vercel.app/api/auth/profile', {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const register = async (formData) => {
    try {
      const res = await fetch('https://task-management-server-softvence-steel.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      
      if (data.success) {
        setUser(data.user)
        router.push('/')
        toast.success('Registration successful!')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('Network error')
    }
  }

  const login = async (formData) => {
    try {
      const res = await fetch('https://task-management-server-softvence-steel.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
      const data = await res.json()
      console.log(data);
      if (data.success) {
        setUser(data.user)
        router.push('/dashboard')
        toast.success('Login successful!')
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      toast.error('Network error')
    }
  }

  const logout = async () => {
    try {
      await fetch('https://task-management-server-softvence-steel.vercel.app/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
      router.push('/')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)