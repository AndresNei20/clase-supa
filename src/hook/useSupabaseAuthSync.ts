import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { supabase } from "../services/supabaseClient"
import { setSession } from "../redux/slices/authSlice"

export function useSupabaseAuthSync() {
      const dispatch = useDispatch()
//
  useEffect(() => {
    // initial session
    const userSession = supabase.auth.getSession()
    .then(({ data }) => {
      dispatch(setSession(data.session))
    })
    console.log(userSession)

    //listen for changes in auth state
    /* const { data: listener } = supabase.auth.onAuthStateChange(( event, session) => { */
    const { data } = supabase.auth.onAuthStateChange(( event, session) => {
      console.log("Auth state changed:", event, session)
      dispatch(setSession(session))
    })


    // cleanup subscription on unmount
   /*  data.subscription.unsubscribe() */

    return () => {
      data.subscription.unsubscribe()
    }
    /* listener.subscription.unsubscribe() */

  },[dispatch])
}