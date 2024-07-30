import { Routes, Route } from 'react-router-dom'
import NoPage from './pages/NoPage'
import SetCodePage from './pages/SetCodePage'
import PinCode from './pages/PinCode'
import TodoPage from './pages/TodoPage'
import Layout from './components/layout/Layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout component={TodoPage} />} />
        <Route path="/set-code" element={<SetCodePage />} />
        <Route path="/pin-code" element={<PinCode />} />
        <Route path="*" element={<NoPage />} />
      </Routes>

    </>
  )
}

export default App
