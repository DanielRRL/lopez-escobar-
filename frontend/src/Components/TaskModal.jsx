import React, { useState, useEffect } from 'react';
import '../App.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function TaskModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaLimite: '',
        encargado: '',
        estado: 'pendiente',
        prioridad: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allFilled = Object.values(formData).every((value) => value.trim() !== '');
        setIsFormValid(allFilled);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="input-label">NOMBRE</span>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <span className="input-label">DESCRIPCIÓN</span>
                        <textarea name="descripcion" rows="2" value={formData.descripcion} onChange={handleChange}></textarea>
                    </div>

                    <div className="input-group icon-right">
                        <span className="input-label">FECHA INICIO</span>
                        <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} />
                        <FaCalendarAlt className="input-icon" />
                    </div>

                    <div className="input-group icon-right">
                        <span className="input-label">FECHA LIMITE</span>
                        <input type="date" name="fechaLimite" value={formData.fechaLimite} onChange={handleChange} />
                        <FaCalendarAlt className="input-icon" />
                    </div>

                    <div className="input-group icon-right">
                        <span className="input-label">ENCARGADO</span>
                        <select name="encargado" value={formData.encargado} onChange={handleChange}>
                            <option value="">Seleccione</option>
                            <option value="Juan">Juan</option>
                            <option value="Ana">Ana</option>
                        </select>
                        <IoMdArrowDropdown className="input-icon" />
                    </div>

                    <div className="input-group icon-right">
                        <span className="input-label">ESTADO</span>
                        <select name="estado" value={formData.estado} onChange={handleChange}>
                            <option value="">Seleccione</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en_progreso">En progreso</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                        <IoMdArrowDropdown className="input-icon" />
                    </div>

                    <div className="input-group icon-right">
                        <span className="input-label">PRIORIDAD</span>
                        <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
                            <option value="">Seleccione</option>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </select>
                        <IoMdArrowDropdown className="input-icon" />
                    </div>

                    <div className="button-row">
                        <button type="button" className="cancel-button" onClick={onClose}>CANCELAR</button>
                        <button type="submit" className="save-button" disabled={!isFormValid}>GUARDAR</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
