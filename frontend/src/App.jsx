import { useState, useRef, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import LoggedInPage from './components/LoggedInPage'
import LandingPage from './components/LandingPage';
import Layout from './Layout';

function App() {


  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage/>}></Route>
        <Route path='/loggedIn' element={<LoggedInPage/>}></Route>
      </Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
