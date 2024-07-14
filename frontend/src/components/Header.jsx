import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Header() {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useContext(UserContext)

  const handleClick = (to) => {
    navigate(to);
  };

  const handleLogout = () => {
    setUserInfo(null)
    navigate('/')
  }

  const username = userInfo?.username;
  const bt1 = username? "Login" : "History"

  return (
    <header className='flex items-center justify-between gap-4 ' >

        <h1 className='font-medium text-[25px]'>Free<span className='text-blue-600'>Scribe</span></h1>
      <div className='flex flex-row gap-5'>
         
        { !username &&
        (
          <><button className='flex items-center gap-2 specialBtn justify-center px-4 py-2 rounded-lg text-white'
            onClick={() => handleClick('/login')}
          >
            <p className='text-sm'>Login</p>
            {/* <i className="fa-solid fa-plus"></i> */}
          </button><button className='flex items-center gap-2 specialBtn justify-center px-4 py-2 rounded-lg text-white'
            onClick={() => handleClick('/signup')}
          >
              <p className='text-sm'>Sign Up</p>
            </button></>
        )
        } 
        { username &&
        (
          <><button className='flex items-center gap-2 specialBtn justify-center px-4 py-2 rounded-lg text-white'
            onClick={() => handleClick('/history')}
          >
            <p className='text-sm'>History</p>
            {/* <i className="fa-solid fa-plus"></i> */}
          </button><button className='flex items-center gap-2 specialBtn justify-center px-4 py-2 rounded-lg text-white'
            onClick={() => handleLogout()}
          >
              <p className='text-sm'>Logout</p>
            </button></>
        )
        } 
      </div>
    </header>
  )
}
