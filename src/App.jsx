import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {
  Login, Profile, Signup, TodoForm, Todos
} from './components/index'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/profile' element={<Profile />}/>
        {/* <Route path='/todoform' element={<TodoForm />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
