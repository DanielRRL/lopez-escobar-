import React, { useState, useEffect } from 'react';
import '../css/ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, onSubmit, editingProject, isEditMode }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        cliente: '',
        prioridad: 'Normal'
    });

    const prioridadOptions = [
        { value: 'Urgente', label: 'Urgente', className: 'priority-urgente' },
        { value: 'Alto', label: 'Alto', className: 'priority-alto' },
        { value: 'Normal', label: 'Normal', className: 'priority-normal' },
        { value: 'Bajo', label: 'Bajo', className: 'priority-bajo' }
    ];

    // Efecto para cargar datos del proyecto a editar
    useEffect(() => {
        if (isOpen) {
            if (isEditMode && editingProject) {
                // Cargar datos del proyecto a editar
                setFormData({
                    titulo: editingProject.titulo || '',
                    descripcion: editingProject.descripcion || '',
                    cliente: editingProject.cliente || '',
                    prioridad: editingProject.prioridad || 'Normal'
                });
                console.log('Cargando datos para editar:', editingProject);
            } else {
                // Resetear formulario para nuevo proyecto
                setFormData({
                    titulo: '',
                    descripcion: '',
                    cliente: '',
                    prioridad: 'Normal'
                });
            }
        }
    }, [isOpen, isEditMode, editingProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.titulo.trim() || !formData.cliente.trim()) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        onSubmit(formData);

        // Resetear formulario
        setFormData({
            titulo: '',
            descripcion: '',
            cliente: '',
            prioridad: 'Normal'
        });

        onClose();
    };

    const handleCancel = () => {
        // Resetear formulario
        setFormData({
            titulo: '',
            descripcion: '',
            cliente: '',
            prioridad: 'Normal'
        });
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    // Función para obtener la clase CSS según la prioridad
    const getPriorityClass = (prioridad) => {
        const option = prioridadOptions.find(opt => opt.value === prioridad);
        return option ? option.className : '';
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {isEditMode ? 'EDITAR PROYECTO' : 'AGREGAR NUEVO PROYECTO'}
                    </h2>
                    <button className="close-button" onClick={handleCancel}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label className="required">Título</label>
                    </div>

                    <div className="input-group">
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Descripción</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="cliente"
                            value={formData.cliente}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label className="required">Cliente</label>
                    </div>

                    <div className="input-group">
                        <select
                            name="prioridad"
                            value={formData.prioridad}
                            onChange={handleChange}
                            className={getPriorityClass(formData.prioridad)}
                        >
                            {prioridadOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <label>Prioridad</label>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            CANCELAR
                        </button>
                        <button type="submit" className="submit-button">
                            {isEditMode ? 'GUARDAR CAMBIOS' : 'CREAR PROYECTO'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;