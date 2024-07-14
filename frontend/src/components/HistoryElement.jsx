import React from 'react'

export default function HistoryElement({transcript, time }) {
  return (
    <div className="flex justify-between items-center p-4 mb-4 rounded-lg border-2 border-[#313131] hover:bg-[#313131] text-gray-500 hover:text-white transition-colors duration-200">
      <div>
        <p className="text-sm font-medium text-white">{transcript}</p>
        <p className="text-xs 0">{time}</p>
      </div>
      <div className="flex space-x-2">
        <button className=" ">
          copy
        </button>
        <button className="">
          download
        </button>
      </div>
    </div>
  )
}
