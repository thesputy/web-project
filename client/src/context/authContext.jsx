import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async(inputs) => {
        const res = await axios.post("http://localhost:8800/auth/login", inputs, { withCredentials: true })
        setCurrentUser(res.data)
    }

    const logout = async () => {
        await axios.post("http://localhost:8800/auth/logout", {}, { withCredentials: true })
        setCurrentUser(null)
        localStorage.removeItem("user")
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}