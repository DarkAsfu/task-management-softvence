'use client'

import Banner from '@/app/modules/Dashboard/Banner'
import Navbar from '@/app/modules/Dashboard/Navbar'
import TaskList from '@/app/modules/Dashboard/TaskList'
import { useAuth } from '@/app/provider/AuthProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [loading, user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading, please wait...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return null
  }

  return (
    <div>
      <Navbar />
      <Banner />
      <TaskList />
    </div>
  )
}

export default page
