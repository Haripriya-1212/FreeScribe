import { useState, useRef, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import LoggedInPage from './components/LoggedInPage'
import LandingPage from './components/LandingPage';
import Layout from './Layout';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {


  
  return (
    <div className='px-24 py-12'>

    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage/>}></Route>
          <Route path='/user' element={<LoggedInPage/>}></Route>
        </Route>
      </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App
