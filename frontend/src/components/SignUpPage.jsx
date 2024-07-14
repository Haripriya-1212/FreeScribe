import React from 'react'
import { useState } from 'react';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
          }
        }
        catch(err){
          console.error("Failed to fetch:", err);
        }
        
    }

  return (
    <div>
        <h1 className='font-medium text-[25px]'>Free<span className='text-blue-600'>Scribe</span></h1>
        <div className='mt-20'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' onChange={ev => setUsername(ev.target.value)} required></input><br/><br/>
                <input type='email' placeholder='Email' onChange={ev => setEmail(ev.target.value)} required></input><br/><br/>
                <input type='password' placeholder='Password' onChange={ev => setPassword(ev.target.value)} required></input><br/><br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}
