import { Button } from '@/components/ui/button'
import Image from 'next/image'
import SectionBanner from './modules/Reusable/SectionBanner'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className=''>
      <SectionBanner/>
      <div className='max-w-[1320px] bg-white rounded-lg border px-2 md:px-0 mx-2 md:mx-auto shadow relative -top-20 z-100'>
        <div className='flex flex-col justify-center items-center mt-[101px]'>
          <Image
            src={'/not-found.svg'}
            width={584}
            height={520}
            className=''
            alt='not found'
          />
           <Link href="/dashboard" className='flex justify-center mt-[87px] mb-[74px] w-full md:w-[584px] mx-auto bg-primary hover:bg-primary/50 text-black font-medium  rounded-md transition-colors text-[18px] py-6'>
          Back to Home
        </Link>
        </div>
       
      </div>
    </div>
  )
}

export default NotFound
