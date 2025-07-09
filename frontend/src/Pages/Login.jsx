import React, { useState } from 'react';
import '../css/Login.css'
import Logo from '../assets/descargar.png'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de autenticación
        console.log('Datos del formulario:', formData);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Logo Container */}
                <div className="logo-container">
                   <img src={Logo} className="logo" alt="logo" />
                </div>

                {/* Login Form */}
                <div className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">CORREO ELECTRÓNICO</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">CONTRASEÑA</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="login-button"
                        type="button"
                    >
                        INGRESAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;