import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

const App = () => {
  const currUser = useState(null)
  return (
    <div>
      <Routes>
        {
          currUser ? <Route path='/login' element={<Login />} /> : <>
          <Route path='/' />
          </> 
        }
      </Routes>
    </div>
  )
}

export default App