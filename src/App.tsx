import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import { FormRegister } from './pages/FormRegister'
import { FormLogin } from './pages/FormLogin'
import { Home } from './pages/Home'
import { useSupabaseAuthSync } from './hook/useSupabaseAuthSync'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { Cart } from './pages/Cart'

function App() {

  useSupabaseAuthSync()

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<FormRegister />} />
          <Route path='/login' element={<FormLogin />} />
          <Route path='/home' element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path='/cart' element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
