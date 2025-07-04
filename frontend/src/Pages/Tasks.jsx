import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../App.css';
import Logo from '../assets/descargar.png';
import TaskModal from '../components/TaskModal';

export default function Tasks() {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <div className="tasks-container">
            <Sidebar />
            <main className="tasks-main-content">
                <header className="tasks-header">
                    <button className="add-task-button" onClick={() => setShowModal(true)}>AGREGAR TAREA</button>
                    <img src={Logo} alt="López & Escobar Logo" className="tasks-logo" />
                </header>

                {tasks.length === 0 ? (
                    <p className="no-tasks-text">SIN TAREAS REGISTRADAS</p>
                ) : (
                    <table className="task-table">
                        <thead>
                        <tr>
                            <th>FECHA INICIO</th>
                            <th>TAREA</th>
                            <th>FECHA LÍMITE</th>
                            <th>PRIORIDAD</th>
                            <th>ESTADO</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.fechaInicio}</td>
                                <td>{task.nombre}</td>
                                <td>{task.fechaLimite}</td>
                                <td>{task.prioridad.charAt(0).toUpperCase() + task.prioridad.slice(1)}</td>
                                <td className="status">{task.estado.charAt(0).toUpperCase() + task.estado.slice(1)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {showModal && (
                    <TaskModal
                        onClose={() => setShowModal(false)}
                        onSave={(task) => {
                            handleAddTask(task);
                            setShowModal(false);
                        }}
                    />
                )}
            </main>
        </div>
    );
}
