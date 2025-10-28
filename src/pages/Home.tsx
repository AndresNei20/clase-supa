import { useNavigate } from "react-router"
import { supabase } from "../services/supabaseClient"

export const Home = () => {

    const navigate = useNavigate()

    const handleCloseSession = async () => {
        const { error } = await supabase.auth.signOut()
        if(error){
            console.log("error signing out", error)
            return
        }
        navigate("/login")
    }
    
    
    const handleGetUser = async() => {
         const { data: { user } } = await supabase.auth.getUser()
         console.log("current user session", user)
     }
    return (
        <>
            <h1>Hola </h1>
            <button onClick={handleCloseSession}>Sign Out</button>
            <button onClick={handleGetUser}>Get user</button>
        </>
    )
}