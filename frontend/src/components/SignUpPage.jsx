import React, { useContext } from 'react'
import { useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    async function handleSubmit(ev){
        ev.preventDefault();
        const signUpData = { username, email, password }

        try{
          const response = await fetch('http://localhost:3000/signup', {
            method: "POST",
            body: JSON.stringify(signUpData),
            headers: { "Content-Type": "application/json" },
          })
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          if (response.ok) {
            const data = await response.json();
            console.log("SignUp successful:", data);
            setUserInfo(data);
            console.log("saved usercontext")
            setRedirect(true)
          }
        }
        catch(err){
          console.error("Failed to fetch:", err);
        }
        
    }

    if(redirect){
      return <Navigate to={'/user'}/>
    }

  return (
    // <div>
    //     <h1 className='font-medium text-[25px]'>Free<span className='text-blue-600'>Scribe</span></h1>
    //     <div className='mt-20'>
    //         <form onSubmit={handleSubmit}>
    //             <input type='text' placeholder='Username' onChange={ev => setUsername(ev.target.value)} required></input><br/><br/>
    //             <input type='email' placeholder='Email' onChange={ev => setEmail(ev.target.value)} required></input><br/><br/>
    //             <input type='password' placeholder='Password' onChange={ev => setPassword(ev.target.value)} required></input><br/><br/>
    //             <button type='submit'>Submit</button>
    //         </form>
    //     </div>
    // </div>

<div>
<h1 className='font-medium text-[25px]'>Free<span className='text-blue-600'>Scribe</span></h1>
<div className='mt-40'>
  <div className="max-w-md w-full mx-auto rounded-none border-solid border-2 border-[#313131] md:rounded-2xl p-4 md:p-10 shadow-input dark:bg-black ">
    <h2 className="font-bold text-xl dark:text-neutral-200 text-center mb-8">SignUp</h2>
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type='text'
        placeholder='Username'
        onChange={ev => setUsername(ev.target.value)}
        required
        className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
      />
      <input
        type='email'
        placeholder='Email'
        onChange={ev => setEmail(ev.target.value)}
        required
        className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
      />
      <input
        type='password'
        placeholder='Password'
        onChange={ev => setPassword(ev.target.value)}
        required
        className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
      />
      <button
        type='submit'
        className="w-full py-2 px-4 mb-20 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  </div>
</div>
</div>
  )
}
