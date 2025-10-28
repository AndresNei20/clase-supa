import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { supabase } from "../services/supabaseClient"

export const FormRegister = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [validatePassword, setValidatePassword] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        setValidatePassword(password.length >= 6)
    }, [password])

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault()
        const { error, data } = await supabase.auth.signUp( {email, password})
        if( error){
            console.log("Error register:", error);
        }
        console.log("registration data",data)

        navigate("/login")
    }


    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <input value={email} placeholder="Email here" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder="Password here" onChange={(e) => setPassword(e.target.value)} />
            {!validatePassword && password && <p>La contraseña debe tener al menos 6 caracteres</p>}
            <button type="submit">Register</button>
        </form>

        <p>Ya tienes cuenta? <Link to={"/login"}>Inicia sesion</Link></p>
        </>
    )
}