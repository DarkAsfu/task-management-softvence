'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { ArrowRight } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { useAuth } from '@/app/provider/AuthProvider'

export default function EditTask() {
  const { task_id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Family',
    dueDate: new Date()
  })

  // Fetch task data on component mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`https://task-management-server-softvence-steel.vercel.app/api/tasks/${task_id}`, {
          credentials: 'include'
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch task')
        }

        setFormData({
          name: data.task.name,
          description: data.task.description,
          category: data.task.category,
          dueDate: new Date(data.task.dueDate)
        })
      } catch (error) {
        toast.error(error.message || 'Failed to load task')
        router.push('/dashboard')
      } finally {
        setFetching(false)
      }
    }

    fetchTask()
  }, [task_id])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }))
  }

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dueDate: date
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) {
        throw new Error('You must be logged in to update a task')
      }

      const dueDateISO = formData.dueDate.toISOString()

      const response = await fetch(`https://task-management-server-softvence-steel.vercel.app/api/tasks/${task_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          dueDate: dueDateISO
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task')
      }

      toast.success('Task updated successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-lg'>Loading task data...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-[1320px] p-5 md:p-[30px] relative -top-14 z-100 rounded-[15px] shadow mx-auto bg-white'>
        <div className=''>
          {/* Header */}
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-[24px] font-poppins font-semibold text-heading'>
              Edit Task
            </h1>
            <Link href="/dashboard">
              <Button className='w-[167px] h-[50px] bg-primary text-heading text-[16px] font-semibold'>
                Back
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='md:flex gap-8'>
              <div className='md:w-[825px] space-y-[19px]'>
                <div>
                  <Label
                    htmlFor='name'
                    className='text-[16px] font-poppins font-semibold text-heading leading-[21.12px] tracking-[-0.32px] block mb-3'
                  >
                    Task Name
                  </Label>
                  <Input
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter Your Task Name'
                    className='w-full h-12 px-4 border border-gray-200 rounded-lg'
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label
                    htmlFor='category'
                    className='text-[16px] font-poppins font-semibold text-heading leading-[21.12px] tracking-[-0.32px] block mb-3'
                  >
                    Select Task Category
                  </Label>
                  <Select 
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className='w-full py-6 px-4 border border-gray-200 rounded-lg'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent className='z-100 bg-white'>
                      <SelectItem value='Arts and Craft'>Art and Craft</SelectItem>
                      <SelectItem value='Family'>Family</SelectItem>
                      <SelectItem value='Nature'>Nature</SelectItem>
                      <SelectItem value='Sports'>Sport</SelectItem>
                      <SelectItem value='Friends'>Friends</SelectItem>
                      <SelectItem value='Meditation'>Meditation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label
                    htmlFor='description'
                    className='text-[16px] font-poppins font-semibold text-heading leading-[21.12px] tracking-[-0.32px] block mb-3'
                  >
                    Description
                  </Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Enter your description here...'
                    className='w-full h-36 px-4 py-4 border border-gray-200 rounded-lg'
                    maxLength={500}
                  />
                </div>
              </div>

              <div className='md:w-[413px]'>
                <Label className='text-[16px] font-poppins font-semibold text-heading leading-[21.12px] tracking-[-0.32px] block mb-3'>
                  Select Due Date
                </Label>

                <div className='bg-gray-50 rounded-lg w-full'>
                  <Calendar
                    mode='single'
                    selected={formData.dueDate}
                    onSelect={handleDateChange}
                    fromDate={new Date()}
                    className='rounded-md border-1 w-full h-[345px]'
                    required
                  />
                </div>
              </div>
            </div>

            <div className='mt-[216px]'>
              <Button
                type="submit"
                disabled={loading}
                style={{
                  background:
                    'linear-gradient(102deg, #05E389 3.72%, #009A62 80.82%)'
                }}
                className='text-heading text-[18px] font-semibold w-[270px] h-[62px] px-8 py-3 rounded-lg flex items-center gap-2 capitalize'
              >
                {loading ? 'Updating Task...' : 'Update Task'}
                {!loading && <ArrowRight
                  className='shrink-0'
                  style={{ width: '26px', height: '26px' }}
                />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}