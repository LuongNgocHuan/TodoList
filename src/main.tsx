import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
// import App from './App.tsx'
// import SetCode from './pages/SetCode.tsx'
// import PinCode from './pages/PinCode.tsx'
import NoPage from './pages/NoPage.tsx'
import Layout from './components/layout/Layout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
