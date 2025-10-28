import { BrowserRouter as Router, Routes, Route, data } from 'react-router'
import './App.css'
import { FormRegister } from './pages/FormRegister'
import { FormLogin } from './pages/FormLogin'
import { Home } from './pages/Home'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { supabase } from './services/supabaseClient'
import { setSession } from './redux/slices/authSlice'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const userSession = supabase.auth.getSession()
    .then(({ data }) => {
      dispatch(setSession(data.session))
    })
    console.log(userSession)


    // Aqui esta función escucha los cambios del auth
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed", event, session)
      dispatch(setSession(session))
    })

    data.subscription.unsubscribe()
   }, [dispatch])

  return (
    <>
     <Router>
       <Routes>
        <Route path='/' element={<FormRegister />} />
        <Route path='/login' element={<FormLogin />} />
        <Route path='/home' element={<Home />} />
       </Routes>
     </Router>
    </>
  )
}

export default App
