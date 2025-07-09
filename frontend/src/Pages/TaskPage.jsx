import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TaskModal from '../components/TaskModal';
import TrelloBoard from '../components/TrelloBoard';
import '../css/TaskPage.css';
import Logo from '../assets/descargar.png';

export default function TaskPage() {
    const [activeMenuItem, setActiveMenuItem] = useState('PROYECTOS');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]); // Array para almacenar las tareas
    const [editingTask, setEditingTask] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const { projectId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener el nombre del proyecto desde el estado de navegación
    const projectName = location.state?.projectName || `Proyecto ${projectId}`;

    const handleMenuClick = (itemId) => {
        setActiveMenuItem(itemId);
    };

    const handleLogout = () => {
        console.log('Cerrando sesión...');
    };

    const handleBackToProjects = () => {
        navigate('/projects');
    };

    const handleAddTask = () => {
        setIsEditMode(false);
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setIsEditMode(true);
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingTask(null);
        setIsEditMode(false);
    };

    const handleModalSubmit = (formData) => {
        if (isEditMode) {
            // Actualizar tarea existente
            setTasks(tasks.map(task =>
                task.id === editingTask.id
                    ? { ...task, ...formData, id: editingTask.id }
                    : task
            ));
            console.log('Tarea actualizada:', formData);
        } else {
            // Agregar nueva tarea
            const newTask = {
                id: Date.now(), // ID temporal
                ...formData,
                fechaCreacion: new Date().toISOString()
            };
            setTasks([...tasks, newTask]);
            console.log('Nueva tarea creada:', newTask);
        }
    };

    return (
        <div className="tasks-container">
            <Sidebar
                activeMenuItem={activeMenuItem}
                onMenuClick={handleMenuClick}
                onLogout={handleLogout}
            />

            <div className="main-content">
                <div className="header-tasks-container">
                    <div
                        className="header-tasks-project"
                        onClick={handleBackToProjects}
                        style={{ cursor: 'pointer' }}
                    >
                        {projectName}
                    </div>
                    <header className="header">
                        <button
                            className="add-tasks-button"
                            onClick={handleAddTask}
                        >
                            AGREGAR TAREAS
                        </button>
                        <img src={Logo} alt="Logo" className="logo" />
                    </header>
                </div>

                <main className="content-area">
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            NO TAREAS REGISTRADAS
                        </div>
                    ) : (
                        <TrelloBoard
                            tasks={tasks}
                            onEditTask={handleEditTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    )}
                </main>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                editingTask={editingTask}
                isEditMode={isEditMode}
                currentProject={projectName}
            />
        </div>
    );
}