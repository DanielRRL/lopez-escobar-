import React from 'react';
import Logo from '../assets/descargar.png';
import '../App.css'
import Sidebar from "../Components/Sidebar.jsx";
import { useAuth } from "../Context/UseAuth.jsx";

export default function DashboardPage() {
    const { auth } = useAuth();

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <img src={Logo} alt="López & Escobar Logo" className="dashboard-logo" />
                <p className="welcome-text">BIENVENIDO {
                    auth?.name
                }</p>
            </main>
        </div>
    );
}
