import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHospital,
    faChartLine,
    faUserInjured,
    faUserMd,
    faCalendarCheck,
    faSignOutAlt,
    faComments,
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ collapsed, toggleSidebar }) => {
    const menuItems = [
        { icon: faChartLine, label: 'Dashboard', path: '/' },
        { icon: faUserInjured, label: 'Patients', path: '/patients' },
        { icon: faUserMd, label: 'Doctors', path: '/doctors' },
        { icon: faCalendarCheck, label: 'Appointments', path: '/appointments' },
        { icon: faCreditCard, label: 'Payments', path: '/payments' },
    ];

    return (
        <div className="d-flex flex-column h-100 p-3">
            <style>
                {`
                    .nav-item-link {
                        color: var(--text-muted);
                        transition: all 0.3s ease;
                    }
                    .nav-item-link:hover {
                        color: var(--primary);
                        background-color: rgba(var(--primary-rgb), 0.05);
                    }
                    .nav-item-link.active {
                        color: #ffffff !important;
                        background: linear-gradient(135deg, var(--primary), var(--accent));
                        box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
                    }
                    /* Prevent dark flash on click */
                    .nav-item-link:active, 
                    .nav-item-link:focus {
                        color: var(--text-muted);
                    }
                    .nav-item-link.active:active, 
                    .nav-item-link.active:focus {
                        color: #ffffff !important;
                    }
                `}
            </style>
            <div
                className="d-flex align-items-center mb-5 mt-2 text-primary-custom cursor-pointer"
                style={{ height: '40px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={toggleSidebar}
                title="Toggle Sidebar"
            >
                <FontAwesomeIcon icon={faHospital} size="2x" className="me-2" />
                {!collapsed && <h4 className="m-0 fw-bold" style={{ whiteSpace: 'nowrap' }}>Admin Panel</h4>}
            </div>

            <nav className="flex-grow-1">
                <ul className="list-unstyled">
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <NavLink
                                to={item.path}
                                className="d-flex align-items-center p-3 rounded text-decoration-none nav-item-link"
                                style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                            >
                                <FontAwesomeIcon icon={item.icon} size="lg" />
                                {!collapsed && <span className="ms-3 fw-medium">{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto">
                <a
                    href="#"
                    className="d-flex align-items-center p-3 rounded text-decoration-none text-danger"
                    style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                    {!collapsed && <span className="ms-3 fw-medium">Logout</span>}
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
