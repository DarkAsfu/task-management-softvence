const SectionBanner = () => {
  return (
    <div className='w-full h-[174px] relative overflow-hidden'>
      <div className='absolute inset-0 bg-[#040612] z-0' />
      <div
        className='absolute inset-0 bg-right-bottom bg-no-repeat bg-contain mix-blend-soft-light z-40'
        style={{
          backgroundImage: "url('/login.png')"
        }}
      />
      <div className='absolute top-0 left-0 h-[200px] w-[400px] -translate-x-[30%] -translate-y-[30%] rounded-full bg-primary opacity-50 blur-[110px] z-30 pointer-events-none' />
      <div className='absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-[30%] translate-y-[30%] rounded-full bg-primary opacity-50 blur-[80px] z-30 pointer-events-none' />
    </div>
  )
}

export default SectionBanner
