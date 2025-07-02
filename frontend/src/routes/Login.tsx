import { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/Login.css';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to ="/dashboard" />;
  }

  return (
    <>
      <form className='form-user' id='form-users'>
        <img src={logo} alt="Logo" />

        <div className='email-user'>
            <label>CORREO ELECTRÓNICO</label>
            <div />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='password-user'>
            <label>CONTRASEÑA</label>
            <div />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button>INGRESAR</button>
      </form>   
    </>
  )
}
