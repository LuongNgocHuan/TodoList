import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import SetCode from './pages/SetCode.tsx'
import PinCode from './pages/PinCode.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='set-code' element={<SetCode />} />
        <Route path='pin-code' element={<PinCode/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
