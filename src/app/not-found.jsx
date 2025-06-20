import { Button } from '@/components/ui/button'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className=''>
      <div className='w-full h-[174px] relative overflow-hidden'>
        {/* Layer 1: Solid dark background */}
        <div className='absolute inset-0 bg-[#040612] z-0' />

        {/* Layer 2: Background image with blend mode */}
        <div
          className='absolute inset-0 bg-right-bottom bg-no-repeat bg-contain mix-blend-soft-light z-40'
          style={{
            backgroundImage: "url('/login.png')"
          }}
        />

        {/* Optional: dim it further */}
        {/* <div className="absolute inset-0 bg-black/40 z-20" /> */}

        {/* Gradient spotlights */}
        <div className='absolute top-0 left-0 h-[200px] w-[400px] -translate-x-[30%] -translate-y-[30%] rounded-full bg-primary opacity-50 blur-[110px] z-30 pointer-events-none' />
        <div className='absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-[30%] translate-y-[30%] rounded-full bg-primary opacity-50 blur-[80px] z-30 pointer-events-none' />
      </div>
      <div className='max-w-[1320px] mx-auto bg-white rounded-lg border shadow relative -top-20 z-100'>
        <div className='flex flex-col justify-center items-center mt-[101px]'>
          <Image
            src={'/not-found.svg'}
            width={584}
            height={520}
            className=''
            alt='not found'
          />
           <Button className='mt-[87px] mb-[74px] w-[584px] mx-auto bg-primary hover:bg-primary/50 text-black font-medium  rounded-md transition-colors text-[18px] py-6'>
          Sign Up
        </Button>
        </div>
       
      </div>
    </div>
  )
}

export default NotFound
