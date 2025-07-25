import React, { useContext } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import { Login, Profile, Signup } from './components/index';
import { AuthContext } from './components/AuthContext';
import Spinner from './components/Spinner';

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/profile' element={<Profile />}/>
        {/* <Route path='/todoform' element={<TodoForm />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
