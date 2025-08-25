import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ContentPage from './pages/ContentPage1'
import UserPage from './pages/UserPage'
import './App.css'

function App() {

  return (

    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/content' element={<ContentPage />} />
      <Route path='/user' element={<UserPage />} />
    </Routes>

  )
};

export default App
