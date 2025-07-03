import {createContext, useState} from "react";
import {loginRequest} from "../Api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            setUser(res.data.user);
            setAuthenticated(true);
            Cookies.set("token", res.data.token);
            console.log(res.data)
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || ["Error de login"]);
        }
    };

    return (
        <AuthContext.Provider value={{
            signin,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}