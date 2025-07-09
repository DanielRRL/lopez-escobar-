// Projects.jsx
import React, { useState, useMemo } from 'react';
import Sidebar from '../Components/Sidebar.jsx';
import '../css/ProjectPage.css';
import Logo from '../assets/descargar.png';
import ProjectModal from "../Components/ProjectModal.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";

const ProjectsPage = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('PROYECTOS');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    // Estados para el modo de edición
    const [editingProject, setEditingProject] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Estados para filtros
    const [priorityFilter, setPriorityFilter] = useState('');
    const [clientSearch, setClientSearch] = useState('');

    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    const handleMenuClick = (itemId) => {
        setActiveMenuItem(itemId);
    };

    const handleLogout = () => {
        console.log('Cerrando sesión...');
    };

    const handleAddProject = () => {
        setIsEditMode(false);
        setEditingProject(null);
        setIsModalOpen(true);
    };

    // Nueva función para manejar la edición
    const handleEditProject = (project) => {
        setEditingProject(project);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setIsEditMode(false);
    };

    const handleSubmitProject = (projectData) => {
        if (isEditMode && editingProject) {
            // Actualizar proyecto existente
            const updatedProject = {
                ...editingProject,
                ...projectData,
                fechaModificacion: new Date().toLocaleDateString()
            };

            setProjects(prevProjects =>
                prevProjects.map(project =>
                    project.id === editingProject.id ? updatedProject : project
                )
            );
            console.log('Proyecto actualizado:', updatedProject);
        } else {
            // Crear nuevo proyecto
            const newProject = {
                id: Date.now(),
                ...projectData,
                fechaCreacion: new Date().toLocaleDateString()
            };

            setProjects(prevProjects => [...prevProjects, newProject]);
            console.log('Nuevo proyecto:', newProject);
        }

        // Cerrar modal y limpiar estados
        setIsModalOpen(false);
        setEditingProject(null);
        setIsEditMode(false);
    };

    const handleDeleteProject = (projectId) => {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));

        const totalProjectsAfterDelete = projects.length - 1;
        const totalPages = Math.ceil(totalProjectsAfterDelete / projectsPerPage);

        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    };

    // Manejar cambios en los filtros
    const handlePriorityChange = (e) => {
        setPriorityFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleClientSearchChange = (e) => {
        setClientSearch(e.target.value);
        setCurrentPage(1);
    };

    // Limpiar filtros
    const clearFilters = () => {
        setPriorityFilter('');
        setClientSearch('');
        setCurrentPage(1);
    };

    // Filtrar proyectos usando useMemo para optimizar rendimiento
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesPriority = priorityFilter === '' || project.prioridad === priorityFilter;
            const matchesClient = clientSearch === '' ||
                project.cliente?.toLowerCase().includes(clientSearch.toLowerCase()) ||
                project.nombreProyecto?.toLowerCase().includes(clientSearch.toLowerCase());

            return matchesPriority && matchesClient;
        });
    }, [projects, priorityFilter, clientSearch]);

    // Calcular proyectos para la página actual
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Componente de paginación
    const Pagination = () => {
        if (totalPages <= 1) return null;

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination-container">
                <button
                    className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ←
                </button>

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                ))}

                <button
                    className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    →
                </button>
            </div>
        );
    };

    return (
        <div className="projects-container">
            <Sidebar
                activeMenuItem={activeMenuItem}
                onMenuClick={handleMenuClick}
                onLogout={handleLogout}
            />

            <div className="main-content">
                <div className="header-container">
                    <div className="filter-container">
                        <div className="filter-priority">
                            <select
                                value={priorityFilter}
                                onChange={handlePriorityChange}
                            >
                                <option value="">Todas las prioridades</option>
                                <option value="Urgente">Urgente</option>
                                <option value="Alto">Alto</option>
                                <option value="Normal">Normal</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </div>
                        <div className="search-customer">
                            <input
                                type="text"
                                placeholder="Buscar cliente o proyecto"
                                value={clientSearch}
                                onChange={handleClientSearchChange}
                            />
                        </div>
                        {(priorityFilter || clientSearch) && (
                            <button
                                className="clear-filters-button"
                                onClick={clearFilters}
                                title="Limpiar filtros"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <header className="header">
                        <button className="add-project-button" onClick={handleAddProject}>
                            AGREGAR PROYECTO
                        </button>
                        <img src={Logo} alt="Logo" className="logo" />
                    </header>
                </div>

                <main className="content-area">
                    {projects.length === 0 ? (
                        <div className="empty-state">
                            SIN PROYECTOS REGISTRADOS
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="empty-state">
                            <p>No se encontraron proyectos que coincidan con los filtros aplicados.</p>
                            <button
                                className="clear-filters-button secondary"
                                onClick={clearFilters}
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    ) : (
                        <div className="projects-content">
                            <div className="pagination-info">
                                Mostrando {indexOfFirstProject + 1} - {Math.min(indexOfLastProject, filteredProjects.length)} de {filteredProjects.length} proyectos
                                {filteredProjects.length !== projects.length && (
                                    <span className="filter-info"> (filtrados de {projects.length} total)</span>
                                )}
                            </div>

                            <Pagination />

                            <div className="projects-grid">
                                {currentProjects.map(project => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onDelete={handleDeleteProject}
                                        onEdit={handleEditProject}
                                    />
                                ))}
                            </div>

                            <div className="pagination-info">
                                Mostrando {indexOfFirstProject + 1} - {Math.min(indexOfLastProject, filteredProjects.length)} de {filteredProjects.length} proyectos
                                {filteredProjects.length !== projects.length && (
                                    <span className="filter-info"> (filtrados de {projects.length} total)</span>
                                )}
                            </div>

                            <Pagination />
                        </div>
                    )}
                </main>

                <ProjectModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitProject}
                    editingProject={editingProject}
                    isEditMode={isEditMode}
                />
            </div>
        </div>
    );
};

export default ProjectsPage;