'use client'

import { useState } from 'react'
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

export default function AddTask () {
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 6, 12)) // July 12, 2020

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-[1320px] p-5 md:p-[30px] relative -top-14 z-100 rounded-[15px] shadow mx-auto bg-white'>
        <div className=''>
          {/* Header */}
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-[24px] font-poppins font-semibold text-heading'>
              Add Your New Task
            </h1>
            <Button className='w-[167px] h-[50px] bg-primary text-heading text-[16px] font-semibold'>
              Back
            </Button>
          </div>

          <div className='md:flex  gap-8'>
            <div className='md:w-[825px] space-y-[19px]'>
              <div>
                <Label
                  htmlFor='taskName'
                  className='text-[16px] font-poppins font-semibold text-heading leading-[21.12px] tracking-[-0.32px] block mb-3'
                >
                  Task Name
                </Label>
                <Input
                  id='taskName'
                  placeholder='Enter Your Task Name'
                  className='w-full h-12 px-4 border border-gray-200 rounded-lg'
                />
              </div>
              <div>
                <Label
                  htmlFor='category'
                  className='text-[16px] font-poppins font-semibold text-heading leading-[21.12px] tracking-[-0.32px] block mb-3'
                >
                  Select Task Category
                </Label>
                <Select defaultValue='art-craft'>
                  <SelectTrigger className='w-full py-6 px-4 border border-gray-200 rounded-lg'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent className='z-100 bg-white'>
                    <SelectItem value='art-craft'>Art and Craft</SelectItem>
                    <SelectItem value='family'>Family</SelectItem>
                    <SelectItem value='nature'>Nature</SelectItem>
                    <SelectItem value='sport'>Sport</SelectItem>
                    <SelectItem value='friends'>Friends</SelectItem>
                    <SelectItem value='meditation'>Meditation</SelectItem>
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
                  placeholder='Enter your description here...'
                  className='w-full h-36 px-4 py-4 border border-gray-200 rounded-lg'
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
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  defaultMonth={new Date(2020, 6)} // July 2020
                  className='rounded-md border-1 w-full h-[345px]'
                />
              </div>
            </div>
          </div>

          <div className='mt-[216px]'>
            <Button
              style={{
                background:
                  'linear-gradient(102deg, #05E389 3.72%, #009A62 80.82%)'
              }}
              className='text-heading text-[18px] font-semibold w-[270px] h-[62px] px-8 py-3 rounded-lg flex items-center gap-2 capitalize'
            >
              Add New Task
              <ArrowRight
                className='shrink-0'
                style={{ width: '26px', height: '26px' }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
