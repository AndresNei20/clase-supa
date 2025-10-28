import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { supabase } from "../services/supabaseClient"

export const FormLogin = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error, data } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.log("Error login:", error);
        } 

        navigate("/home")
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin} >
                <input value={email} placeholder="Email here" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password here" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log in</button>
            </form>

            <p>No tienes cuenta? <Link to={"/"}>Registrate</Link></p>
        </>
    )
}