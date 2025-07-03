import '../App.css'
import Logo  from '../assets/descargar.png'
import { useState, useEffect } from "react";
import { useAuth } from "../Context/UseAuth.jsx";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const { signin, errors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(user);
    };

    useEffect (() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated]);

    return (
        <div>
            <form className='form-user' id='form-users' onSubmit={handleSubmit} >
                <img src={Logo} alt="Logo" />

                <div className='email-user'>
                    <label>CORREO ELECTRÓNICO</label>
                    <div />
                    <input type="email" required onChange={handleChange} name='email' />
                </div>
                <div className='password-user'>
                    <label>CONTRASEÑA</label>
                    <div />
                    <input type="password" required onChange={handleChange} name='password' />
                </div>

                <button>INGRESAR</button>
                {errors && <p>{errors}</p>}
            </form>
            {isAuthenticated && <p>¡Login exitoso!</p>}
        </div>
    )
}

export default LoginPage