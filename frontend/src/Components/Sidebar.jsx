import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul className="menu">
                <li>
                    <Link to="/tasks" className="menu-link">TAREAS</Link>
                </li>
                <li>
                    <Link to="/employees" className="menu-link">EMPLEADOS</Link>
                </li>
                <li>
                    <Link to="/settings" className="menu-link">CONFIGURACIÓN</Link>
                </li>
            </ul>
            <button className="logout-button">CERRAR SESIÓN</button>
        </aside>
    );
}
