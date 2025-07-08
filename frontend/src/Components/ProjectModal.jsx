import React, { useState, useEffect } from 'react';

export default function ProjectModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        title: '',
        priority: 'Normal',
        description: '',
        customer: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                priority: initialData.priority,
                description: initialData.description,
                customer: initialData.customer,
            });
        } else {
            setFormData({
                title: '',
                priority: 'Normal',
                description: '',
                customer: '',
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim()) {
            onSave(formData);
        }
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="modal-input">
                        <label>TÍTULO</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="modal-input">
                        <label>DESCRIPCIÓN</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="modal-input">
                        <label>CLIENTE</label>
                        <input
                            type="text"
                            name="customer"
                            value={formData.customer}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="modal-input">
                        <label>PRIORIDAD</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                        >
                            <option value="Bajo">Bajo</option>
                            <option value="Normal">Normal</option>
                            <option value="Alto">Alto</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                    </div>

                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="btn_cancel"
                            onClick={handleClose}
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            className="btn_save"
                        >
                            GUARDAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
