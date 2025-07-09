import React, { useState, useEffect } from 'react';
import '../css/TasksModal.css'

const TaskModal = ({ isOpen, onClose, onSubmit, editingTask, isEditMode, currentProject }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        encargado: '',
        estado: 'pendiente',
        proyecto: currentProject || ''
    });

    const estadoOptions = [
        { value: 'pendiente', label: 'Pendiente', className: 'status-pendiente' },
        { value: 'en_progreso', label: 'En Progreso', className: 'status-en-progreso' },
        { value: 'completado', label: 'Completado', className: 'status-completado' },
        { value: 'en_espera', label: 'En Espera', className: 'status-en-espera' },
        { value: 'bajo_revision', label: 'Bajo Revisión', className: 'status-bajo-revision' }
    ];

    // Efecto para cargar datos de la tarea a editar
    useEffect(() => {
        if (isOpen) {
            if (isEditMode && editingTask) {
                // Cargar datos de la tarea a editar
                setFormData({
                    nombre: editingTask.nombre || '',
                    descripcion: editingTask.descripcion || '',
                    encargado: editingTask.encargado || '',
                    estado: editingTask.estado || 'pendiente',
                    proyecto: editingTask.proyecto || currentProject || ''
                });
                console.log('Cargando datos para editar:', editingTask);
            } else {
                // Resetear formulario para nueva tarea
                setFormData({
                    nombre: '',
                    descripcion: '',
                    encargado: '',
                    estado: 'pendiente',
                    proyecto: currentProject || ''
                });
            }
        }
    }, [isOpen, isEditMode, editingTask, currentProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre.trim() || !formData.encargado.trim()) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        onSubmit(formData);

        // Resetear formulario
        setFormData({
            nombre: '',
            descripcion: '',
            encargado: '',
            estado: 'pendiente',
            proyecto: currentProject || ''
        });

        onClose();
    };

    const handleCancel = () => {
        // Resetear formulario
        setFormData({
            nombre: '',
            descripcion: '',
            encargado: '',
            estado: 'pendiente',
            proyecto: currentProject || ''
        });
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    // Función para obtener la clase CSS según el estado
    const getStatusClass = (estado) => {
        const option = estadoOptions.find(opt => opt.value === estado);
        return option ? option.className : '';
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {isEditMode ? 'EDITAR TAREA' : 'AGREGAR NUEVA TAREA'}
                    </h2>
                    <button className="close-button" onClick={handleCancel}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label className="required">Nombre</label>
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
                            name="encargado"
                            value={formData.encargado}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label className="required">Encargado</label>
                    </div>

                    <div className="input-group">
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className={getStatusClass(formData.estado)}
                        >
                            {estadoOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <label>Estado</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="proyecto"
                            value={formData.proyecto}
                            onChange={handleChange}
                            placeholder=" "
                            readOnly
                            className="readonly-input"
                        />
                        <label>Proyecto</label>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            CANCELAR
                        </button>
                        <button type="submit" className="submit-button">
                            {isEditMode ? 'GUARDAR CAMBIOS' : 'CREAR TAREA'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;