'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Trash2, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        withCredentials: true
      })
      setTasks(res.data.tasks || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-purple-700 text-purple-700 border-purple-200'
      case 'In Progress':
        return 'bg-orange-700 text-orange-700 border-orange-200'
      case 'Done':
        return 'bg-green-700 text-green-700 border-green-200'
      default:
        return 'bg-gray-700 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-[1320px] p-5 md:p-[30px] relative -top-14 z-100 rounded-[15px] shadow mx-auto bg-white'>
        {/* Header */}
        <div className='md:flex items-center justify-between mb-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>All Task List</h1>

          <div className='grid grid-cols-2 mt-2 md:grid-cols-3 gap-3 space-x-4'>
            <Select defaultValue='all-categories'>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select Task Category' />
              </SelectTrigger>
              <SelectContent className='z-200 bg-white'>
                <SelectItem value='all-categories'>All</SelectItem>
                <SelectItem value='design'>Design</SelectItem>
                <SelectItem value='development'>Development</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue='all-tasks'>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='All Tasks' />
              </SelectTrigger>
              <SelectContent className='z-200 bg-white'>
                <SelectItem value='all-tasks'>All</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='in-progress'>In Progress</SelectItem>
                <SelectItem value='done'>Done</SelectItem>
              </SelectContent>
            </Select>

            <Link href='/dashboard/add-task'>
              <Button className='bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2'>
                <Plus className='w-4 h-4' />
                <span>Add New Task</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Task Grid */}
        {loading ? (
          <div className="text-center text-gray-500">Loading tasks...</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {tasks.map((task) => (
              <Link key={task._id} href={`/dashboard/task-details/${task._id}`}>
                <Card className='bg-white shadow-sm hover:shadow-md transition-shadow'>
                  <CardContent className='p-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm'>
                          <Image
                            src='/ticon.png'
                            width={24}
                            height={24}
                            alt='task-icon'
                          />
                        </div>
                        <h3 className='font-semibold text-[#161616] font-poppins text-[20px]'>
                          {task.name}
                        </h3>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-red-500 hover:text-red-700 hover:bg-red-50'
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>

                    <p className='text-[#667085] font-poppins text-[14px] mb-7 ml-[48px]'>
                      {task.description}
                    </p>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2 text-[#1F1F1F] text-sm font-poppins'>
                        <Calendar className='w-6 h-6' />
                        <span>{new Date(task.dueDate).toDateString()}</span>
                      </div>
                      <Badge
                        variant='outline'
                        className={`${getStatusColor(task.status)} font-medium border-0 bg-transparent`}
                      >
                        <span
                          className={`${getStatusColor(task.status)} h-2 w-2 rounded-full`}
                        ></span>{' '}
                        {task.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
