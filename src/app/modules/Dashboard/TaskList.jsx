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
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('all-categories')
  const [statusFilter, setStatusFilter] = useState('all-tasks')

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [tasks, categoryFilter, statusFilter])

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

  const applyFilters = () => {
    let result = [...tasks]

    // Apply category filter
    if (categoryFilter !== 'all-categories') {
      result = result.filter(task => task.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== 'all-tasks') {
      result = result.filter(task => 
        statusFilter === 'pending' ? task.status === 'Pending' :
        statusFilter === 'ongoing' ? task.status === 'Ongoing' :
        statusFilter === 'collaborative' ? task.status === 'Collaborative Task' :
        statusFilter === 'done' ? task.status === 'Done' : true
      )
    }

    setFilteredTasks(result)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-purple-700 text-purple-700 border-purple-200'
      case 'Ongoing':
        return 'bg-orange-700 text-orange-700 border-orange-200'
      case 'Collaborative Task':
        return 'bg-blue-700 text-blue-700 border-blue-200'
      case 'Done':
        return 'bg-green-700 text-green-700 border-green-200'
      default:
        return 'bg-gray-700 text-gray-700 border-gray-200'
    }
  }

  const handleDelete = async (taskId, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        withCredentials: true
      })
      toast.success('Task deleted successfully')
      fetchTasks() // Refresh the task list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-[1320px] p-5 md:p-[30px] relative -top-14 z-100 rounded-[15px] shadow mx-auto bg-white'>
        {/* Header */}
        <div className='md:flex items-center justify-between mb-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>
            All Task List
          </h1>

          <div className='grid grid-cols-2 mt-2 md:grid-cols-3 gap-3 space-x-4 h-[50px]'>
            <Select 
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className='w-[200px] text-base h-auto min-h-[50px]'>
                <SelectValue placeholder='Select Task Category' />
              </SelectTrigger>
              <SelectContent className='z-200 bg-white'>
                <SelectItem value='all-categories'>All Categories</SelectItem>
                <SelectItem value='Arts and Craft'>Art and Craft</SelectItem>
                <SelectItem value='Family'>Family</SelectItem>
                <SelectItem value='Nature'>Nature</SelectItem>
                <SelectItem value='Sports'>Sport</SelectItem>
                <SelectItem value='Friends'>Friends</SelectItem>
                <SelectItem value='Meditation'>Meditation</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className='w-[200px] text-base h-auto min-h-[50px]'>
                <SelectValue placeholder='All Tasks' />
              </SelectTrigger>
              <SelectContent className='z-200 bg-white'>
                <SelectItem value='all-tasks'>All Statuses</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='ongoing'>Ongoing</SelectItem>
                <SelectItem value='collaborative'>Collaborative Task</SelectItem>
                <SelectItem value='done'>Done</SelectItem>
              </SelectContent>
            </Select>

            <Link href='/dashboard/add-task'>
              <Button className='bg-primary h-[50px] text-heading flex items-center space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='20'
                  viewBox='0 0 18 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M11.236 0.761963H4.584C2.525 0.761963 0.75 2.43096 0.75 4.49096V15.34C0.75 17.516 2.408 19.115 4.584 19.115H12.572C14.632 19.115 16.302 17.4 16.302 15.34V6.03796L11.236 0.761963Z'
                    stroke='#1F1F1F'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10.9766 0.750244V3.65924C10.9766 5.07924 12.1256 6.23124 13.5456 6.23424C14.8616 6.23724 16.2086 6.23824 16.2996 6.23224'
                    stroke='#1F1F1F'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10.7994 10.9141H5.89844'
                    stroke='#1F1F1F'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8.34375 13.3654V8.46436'
                    stroke='#1F1F1F'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>Add New Task</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Task Grid */}
        {loading ? (
          <div className='text-center text-gray-500'>Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-12'>
            <Image
              src='/notavailable.png'
              width={300}
              height={300}
              alt='No tasks found'
              className='mb-6'
            />

            <p className='text-heading text-[24px] font-poppins font-semibold mb-6'>
              {tasks.length === 0 
                ? "You don't have any tasks yet. Create your first task to get started!"
                : "No tasks match your filters"}
            </p>
            <Link href='/dashboard/add-task'>
              <Button className='bg-primary hover:bg-primary/90 text-heading'>
                <Plus className='w-4 h-4 mr-2' />
                Create New Task
              </Button>
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredTasks.map(task => (
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
                        onClick={(e) => handleDelete(task._id, e)}
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
                        className={`${getStatusColor(
                          task.status
                        )} font-medium border-0 bg-transparent`}
                      >
                        <span
                          className={`${getStatusColor(
                            task.status
                          )} h-2 w-2 rounded-full`}
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