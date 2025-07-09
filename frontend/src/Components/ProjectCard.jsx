import React from 'react';
import '../css/ProjectCard.css';
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onDelete, onEdit }) => {
    const navigate = useNavigate();
    const getPriorityClass = (prioridad) => {
        const priorityClasses = {
            'Urgente': 'priority-urgente',
            'Alto': 'priority-alto',
            'Normal': 'priority-normal',
            'Bajo': 'priority-bajo'
        };
        return priorityClasses[prioridad] || 'priority-normal';
    };

    const handleEdit = () => {
        onEdit(project);
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
            onDelete(project.id);
        }
    };

    const handleViewDetails = () => {
        // Redireccionar a la página de tareas del proyecto
        navigate(`/projects/tasks/${project.id}`, {
            state: {
                project: project,
                projectName: project.titulo,
                projectClient: project.cliente
            }
        });
    };

    return (
        <div className="project-card">
            <div className="card-header">
                <h3 className="project-title">{project.titulo}</h3>
                <button className="delete-button" onClick={handleDelete}>
                    ×
                </button>
            </div>

            <div className="card-body">
                <div className="project-info">
                    <div className="info-item-cliente">
                        <span className="info-label">Cliente:</span>
                        <span className="info-value">{project.cliente}</span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Prioridad:</span>
                        <span className={`priority-badge ${getPriorityClass(project.prioridad)}`}>
                            {project.prioridad}
                        </span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Fecha de creación:</span>
                        <span className="info-value">{project.fechaCreacion}</span>
                    </div>

                    {project.descripcion && (
                        <div className="info-item description">
                            <span className="info-label">Descripción:</span>
                            <p className="info-value">{project.descripcion}</p>
                        </div>
                    )}
                </div>
                <div className="card-footer">
                    <button className="edit-button" onClick={handleEdit}>
                        EDITAR
                    </button>
                    <button className="view-button" onClick={handleViewDetails}>
                        VER DETALLES
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProjectCard;