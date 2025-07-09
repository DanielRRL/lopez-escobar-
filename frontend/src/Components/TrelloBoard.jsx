import React from 'react';
import '../css/TrelloBoard.css';

const TrelloBoard = ({ tasks, onEditTask, onDeleteTask }) => {
    // Definir las columnas del tablero
    const columns = [
        { id: 'pendiente', title: 'Pendiente', className: 'column-pendiente' },
        { id: 'en_progreso', title: 'En Progreso', className: 'column-en-progreso' },
        { id: 'bajo_revision', title: 'Bajo Revisión', className: 'column-bajo-revision' },
        { id: 'en_espera', title: 'En Espera', className: 'column-en-espera' },
        { id: 'completado', title: 'Completado', className: 'column-completado' }
    ];

    // Función para filtrar tareas por estado
    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.estado === status);
    };

    // Función para obtener la clase CSS del estado
    const getStatusClass = (estado) => {
        const statusClasses = {
            'pendiente': 'status-pendiente',
            'en_progreso': 'status-en-progreso',
            'completado': 'status-completado',
            'en_espera': 'status-en-espera',
            'bajo_revision': 'status-bajo-revision'
        };
        return statusClasses[estado] || 'status-pendiente';
    };

    // Función para formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleDelete = (taskId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            onDeleteTask(taskId);
        }
    };

    return (
        <div className="trello-container">
            <div className="trello-board">
                {columns.map(column => (
                    <div key={column.id} className={`trello-column ${column.className}`}>
                        <div className="column-header">
                            <h3 className="column-title">{column.title}</h3>
                            <span className="task-count">
                            {getTasksByStatus(column.id).length}
                        </span>
                        </div>

                        <div className="column-content">
                            {getTasksByStatus(column.id).length === 0 ? (
                                <div className="empty-column">
                                    <p>No hay tareas en esta columna</p>
                                </div>
                            ) : (
                                getTasksByStatus(column.id).map(task => (
                                    <div key={task.id} className="task-card">
                                        <div className="task-header">
                                            <h4 className="task-title">{task.nombre}</h4>
                                            <div className="task-actions">
                                                <button
                                                    className="edit-task-btn"
                                                    onClick={() => onEditTask(task)}
                                                    title="Editar tarea"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="delete-task-btn"
                                                    onClick={() => handleDelete(task.id)}
                                                    title="Eliminar tarea"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        {task.descripcion && (
                                            <p className="task-description">{task.descripcion}</p>
                                        )}

                                        <div className="task-info">
                                            <div className="task-assignee">
                                                <span className="assignee-label">Encargado:</span>
                                                <span className="assignee-name">{task.encargado}</span>
                                            </div>

                                            <div className="task-meta">
                                            <span className={`status-badge ${getStatusClass(task.estado)}`}>
                                                {columns.find(col => col.id === task.estado)?.title}
                                            </span>
                                                <span className="creation-date">
                                                {formatDate(task.fechaCreacion)}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrelloBoard;