import React from 'react';
import '../App.css';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul className="menu">
                <li>TAREAS</li>
                <li>EMPLEADOS</li>
                <li>CONFIGURACIÓN</li>
            </ul>
            <button className="logout-button">CERRAR SESIÓN</button>
        </aside>
    );
}
