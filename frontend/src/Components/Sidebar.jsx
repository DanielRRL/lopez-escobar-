import React from 'react';
import '../App.css';
import {Link, useLocation} from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <ul>
                <li className={location.pathname === "/projects" ? "active" : ""}>
                    <Link to="/projects">PROYECTOS</Link>
                </li>
                <li className={location.pathname === "/employees" ? "active" : ""}>
                    <Link to="/employees">EMPLEADOS</Link>
                </li>
                <li className={location.pathname === "/settings" ? "active" : ""}>
                    <Link to="/settings">CONFIGURACIÓN</Link>
                </li>
            </ul>
            <button className="logout-button">CERRAR SESIÓN</button>
        </div>
    );
}
