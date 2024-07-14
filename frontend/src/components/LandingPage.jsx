import React from 'react'
import { TypewriterEffect } from '../ui/TypeWriter'

export default function LandingPage() {
  return (
    <div className='flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 pt-28'>
        <TypewriterEffect text={"Hello, I want to finish this soon"}/>
    </div>
  )
}
