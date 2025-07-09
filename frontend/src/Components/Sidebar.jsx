// Sidebar.jsx
import React, { useEffect, useState } from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ onLogout }) => {
    const [activeMenuItem, setActiveMenuItem] = useState('PROYECTOS');

    const menuItems = [
        { id: 'PROYECTOS', label: 'PROYECTOS', path: '/projects' },
        { id: 'EMPLEADOS', label: 'EMPLEADOS', path: '/employees' },
        { id: 'COFIGURACIÓN', label: 'COFIGURACIÓN', path: '/configuration' },
    ];

    // Función para determinar la opción activa basada en la URL
    const getActiveMenuFromUrl = (pathname) => {
        if (pathname.includes('/projects') || pathname.includes('/proyecto')) {
            return 'PROYECTOS';
        } else if (pathname.includes('/employees') || pathname.includes('/empleado')) {
            return 'EMPLEADOS';
        } else if (pathname.includes('/configuration') || pathname.includes('/config')) {
            return 'COFIGURACIÓN';
        }
    };

    // Función para manejar cambios en la URL
    const handleUrlChange = () => {
        const currentPath = window.location.pathname;
        const activeOption = getActiveMenuFromUrl(currentPath);
        setActiveMenuItem(activeOption);
    };

    useEffect(() => {
        // Establecer la opción activa basada en la URL actual
        handleUrlChange();

        // Escuchar cambios en la URL (para navegación programática)
        window.addEventListener('popstate', handleUrlChange);

        // Limpiar el listener al desmontar
        return () => {
            window.removeEventListener('popstate', handleUrlChange);
        };
    }, []);

    const handleMenuClick = (item) => {
        // Actualizar el estado local inmediatamente
        setActiveMenuItem(item.id);

        // Navegar a la URL correspondiente
        window.history.pushState({}, '', item.path);

        // Disparar evento personalizado para que otros componentes puedan reaccionar
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="sidebar">
            <nav className="sidebar-menu">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`menu-item ${activeMenuItem === item.id ? 'active' : ''}`}
                        onClick={() => handleMenuClick(item)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            <button className="logout-button" onClick={onLogout}>
                CERRAR SESIÓN
            </button>
        </div>
    );
};

export default Sidebar;