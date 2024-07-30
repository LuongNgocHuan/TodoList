import { Routes, Route } from 'react-router-dom'
import NoPage from './pages/NoPage'
import PinCode from './pages/PinCode'
import SetCode from './pages/SetCode'
import TodoPage from './pages/TodoPage'
import Layout from './components/layout/Layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout component={TodoPage} />} />
        <Route path="/pin-code" element={<PinCode />} />
        <Route path="/set-code" element={<SetCode />} />
        <Route path="*" element={<NoPage />} />
      </Routes>

    </>
  )
}

export default App
