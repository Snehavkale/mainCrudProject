import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import CrudData from './components/CrudData'
import { Routes, Route } from 'react-router-dom'
import Edit from './components/Edit'

import AddData from './components/AddData';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Container } from '@mui/material';


function App() {


  return (
    <Container>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<CrudData />} />
        <Route path='/add' element={<AddData />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </Container>
  )
}

export default App
