import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const currUser = useState(null)
  return (
    <div>
      <Routes>
        
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} />
      
        
      </Routes>
    </div>
  )
}

export default App