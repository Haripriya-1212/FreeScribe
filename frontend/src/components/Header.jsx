import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleClick = (to) => {
    navigate(to);
  };

  return (
    <header className='flex items-center justify-between gap-4 ' >

        <h1 className='font-medium text-[25px]'>Free<span className='text-blue-600'>Scribe</span></h1>
      <div className='flex flex-row gap-5'>
        <button className='flex items-center gap-2 specialBtn justify-center px-4 py-2 rounded-lg text-white'
        onClick={() => handleClick('/login')}
        >
            <p className='text-sm'>Login</p>
            {/* <i className="fa-solid fa-plus"></i> */}
        </button>
        <button className='flex items-center gap-2 specialBtn justify-center px-4 py-2 rounded-lg text-white'
        onClick={() => handleClick('/signup')}
        >
            <p className='text-sm'>Sign Up</p>
        </button>
      </div>
    </header>
  )
}
