import React from 'react'

export default function  (props) {
    const { downloading } = props
  return (
    <div className='flex flex-col justify-center gap-10 md:gap-14 pb-24 p-4 flex-1 '>
        <div className='flex flex-col justify-center gap-10 md:gap-14 '>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'><span className='text-blue-600 bold'>Transcribing</span></h1> 
            <p>{!downloading ? "Cylinders warming up" : "Core cylinders engaged"}</p>
        </div>
        <div className='flex flex-col gap-2 sm:gap-4 max-w-[500px] w-full'>
            {[0, 1, 2].map(val => (
          <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-100 loading' + ` loading${val}`}></div>
        ))}

        </div>
    </div>
  )
}
