import React, { useState } from "react";
import Logo from '../assets/descargar.png'
import '../App.css'
import Sidebar from "../Components/Sidebar.jsx";
import ProjectModal from "../Components/ProjectModal.jsx";

export default function ProjectPage() {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [priorityFilter, setPriorityFilter] = useState("");
    const [editingProject, setEditingProject] = useState(null);

    const projectsPerPage = 5;

    const handleOpenModal = () => {
        setEditingProject(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProject(null);
    };

    const handleSaveProject = (projectData) => {
        if (editingProject) {
            // Editar proyecto existente
            setProjects(prevProjects =>
                prevProjects.map(p =>
                    p.id === editingProject.id
                        ? { ...p, title: projectData.title, priority: projectData.priority }
                        : p
                )
            );
        } else {
            // Crear nuevo proyecto
            const newProject = {
                id: Date.now(),
                title: projectData.title,
                priority: projectData.priority,
                createdAt: new Date()
            };
            setProjects(prevProjects => [...prevProjects, newProject]);
        }

        setShowModal(false);
        setEditingProject(null);
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setShowModal(true);
    };

    const handlePriorityFilterChange = (e) => {
        setPriorityFilter(e.target.value);
        setCurrentPage(1);
    };

    const filteredProjects = priorityFilter
        ? projects.filter(project => project.priority === priorityFilter)
        : projects;

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="projects-container">
            <Sidebar />
            <div className="main-content">
                <div className="top-bar">
                    <div className="top-bar-left">
                        <select
                            value={priorityFilter}
                            onChange={handlePriorityFilterChange}
                            className="priority-filter"
                        >
                            <option value="">Todas las prioridades</option>
                            <option value="Urgente">Urgente</option>
                            <option value="Alto">Alto</option>
                            <option value="Normal">Normal</option>
                            <option value="Bajo">Bajo</option>
                        </select>
                    </div>
                    <button className="add-project-button" onClick={handleOpenModal}>
                        AGREGAR PROYECTO
                    </button>
                    <img src={Logo} alt="López & Escobar Logo" className="dashboard-logo" />
                </div>
                <div className="content-center">
                    {filteredProjects.length === 0 ? (
                        <p className="empty-message">SIN PROYECTOS REGISTRADAS</p>
                    ) : (
                        <div className="projects-list">
                            {currentProjects.map(project => (
                                <div key={project.id} className="project-card">
                                    <div className="project-content">
                                        <h3 className="project-title">{project.title}</h3>
                                        <div className="project-priority">
                                            <span
                                                className={`priority-dot ${
                                                    project.priority === 'Urgente' ? 'urgent' :
                                                        project.priority === 'Alto' ? 'alto' :
                                                            project.priority === 'Bajo' ? 'bajo' : 'normal'
                                                }`}
                                            ></span>
                                            <span className="priority-text">{project.priority}</span>
                                        </div>
                                    </div>
                                    <div className="project-actions">
                                        <button
                                            className="action-button edit-button"
                                            onClick={() => handleEditProject(project)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                    >
                                        ‹
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                        <button
                                            key={pageNumber}
                                            className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}

                                    <button
                                        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <ProjectModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onSave={handleSaveProject}
                initialData={editingProject}
            />
        </div>
    );
}
