import React from 'react'
import { TypewriterEffect } from '../ui/TypeWriter'
import { Features } from '../ui/Features';

export default function LandingPage() {
  return (
    <div className='flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 pt-28'>
        <TypewriterEffect text={"Transform Your Speech into Text with Ease!"}/>
        <p className="text-2xl font-medium text-[#5f5f5f]">Efficient Transcription &nbsp; | &nbsp; Accurate Text Output &nbsp; |&nbsp;  Hassle-Free Service</p>
        <div className='w-[1000px]'>

        <p className='text-blue-600 font-medium'>Unlock the power of effortless transcription! </p>
        <p>Whether you're a busy professional needing accurate meeting notes, a student transcribing lectures, or anyone in need of reliable text conversion, our platform delivers precision and speed. Simply upload your audio file or record, and let our advanced system handle the rest. Enjoy the convenience of high-quality transcripts delivered quickly, with a user-friendly interface designed to make your life easier. Transform your spoken words into actionable text with ease and confidence.</p>
        </div>
        <Features/>
    </div>
  )
}
