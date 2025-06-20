import SectionBanner from '@/app/modules/Reusable/SectionBanner'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const page = () => {
  return (
    <div>
      <SectionBanner />
      <div className='max-w-[1320px] bg-white rounded-lg border px-2 md:px-0 mx-2 md:mx-auto shadow relative -top-20 z-100 pt-[87px] pb-[74px]'>
        <div className='flex-1 flex items-center justify-center p- bg-white'>
          <div className='w-full max-w-md space-y-6'>
            <div className='text-center space-y-2'>
              <div className='max-w-max p-[18px] rounded-3xl mx-auto' style={{
                background: "linear-gradient(102deg, #05E389 3.72%, #009A62 80.82%)"
              }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                //   width='60'
                //   height='60'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='lucide lucide-timer-icon lucide-timer w-[36px] text-white md:w-[60px] md:h-[60px]'
                >
                  <line x1='10' x2='14' y1='2' y2='2' />
                  <line x1='12' x2='15' y1='14' y2='11' />
                  <circle cx='12' cy='14' r='8' />
                </svg>
              </div>
              <h1
                className='text-[40px] font-semibold text-heading font-poppins leading-[52.8px]
            tracking-[-0.8px]'
              >
                Reset your Password
              </h1>
              <p className='text-[14px] text-[#667085] font-[500] leading-[26.24px] font-poppins'>
                Strong passwords include numbers, letters, and punctuation
                marks.
              </p>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-sm font-medium text-heading'
                >
                  Email Address
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m32220@gmail.com'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60E5AE] focus:border-transparent'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='new password'
                  className='text-sm font-medium text-heading'
                >
                  Enter New Password
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter new password'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60E5AE] focus:border-transparent'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='new password'
                  className='text-sm font-medium text-heading'
                >
                  Confirm Password
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Retype password'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60E5AE] focus:border-transparent'
                />
              </div>
              <Button className='w-full bg-primary hover:bg-primary/50 text-black font-medium  rounded-md transition-colors text-[18px] py-6 mt-[26px]'>
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
