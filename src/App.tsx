import './App.css'
import { Routes, Route } from 'react-router-dom'
import Auth from './screen/auth'
import Home from './screen/home'

function App() {
  return (

    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/home/login' element={<Auth />} />
    </Routes>
  )
}

export default App
