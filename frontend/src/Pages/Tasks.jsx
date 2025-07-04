import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import '../App.css';
import Logo from '../assets/descargar.png';
import TaskModal from "../Components/TaskModal.jsx";

export default function TaskPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="tasks-container">
            <Sidebar />
            <main className="tasks-main-content">
                <header className="tasks-header">
                    <button className="add-task-button" onClick={() => setShowModal(true)}>AGREGAR TAREA</button>
                    <img src={Logo} alt="López & Escobar Logo" className="tasks-logo" />
                </header>
                <p className="no-tasks-text">SIN TAREAS REGISTRADAS</p>

                {showModal && <TaskModal onClose={() => setShowModal(false)} />}
            </main>
        </div>
    );
}