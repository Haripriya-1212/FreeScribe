import React from 'react'

export default function FileDisplay(props) {
    const { handleFormSubmission, handleAudioReset,  file, audioStream } = props

  return (
    <main className='flex-1 flex flex-col gap-3 sm:gap-4 justify-center p-4 pb-20 w-72 max-w-full'>
      {/* YOURFILE */}
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your<span className='text-blue-600 bold'>File</span></h1>
        {/* NAME OF FILE */}
        <div className='flex flex-col text-left my-4'>
            <h3 className='font-semibold'>Name</h3>
            <p>{file ? file.name : "Custom Audio"}</p>
        </div>
        {/* RESET & TRANSCRIBE BUTTONS */}
        <div className='flex items-center justify-between gap-4'>
            <button className='text-slate-400 hover:text-blue-500 duration-200' onClick={handleAudioReset}>Reset</button>
            <button 
            className='specialBtn2 w-130 px-4 py-2 rounded-xl text-blue-500 flex items-center gap-2 font-medium'
            onClick={handleFormSubmission}
            >
                <p>Transcribe</p>
                <i className="fa-solid fa-pen-nib"></i>
                </button>
        </div>
    </main>
  )
}
