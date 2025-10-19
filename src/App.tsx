import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const currUser = useState(null)
  return (
    <div>
      <Routes>
        {
          !currUser ? <Route path='/login' /> : <>
          <Route path='/' />
          </> 
        }
      </Routes>
    </div>
  )
}

export default App