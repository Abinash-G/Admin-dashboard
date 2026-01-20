import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleTheme, currentTheme, toggleSidebar, searchQuery, setSearchQuery }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const headerRef = useRef(null);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        if (location.pathname !== '/patients' && val.trim() !== '') {
            navigate('/patients');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getTitle = (path) => {
        switch (path) {
            case '/': return 'Dashboard';
            case '/patients': return 'Patients';
            case '/doctors': return 'Doctors';
            case '/appointments': return 'Appointments';
            case '/payments': return 'Payments';
            default:
                if (path.startsWith('/patients/')) return 'Patient Details';
                if (path.startsWith('/doctors/')) return 'Doctor Details';
                return 'Dashboard';
        }
    };

    const title = getTitle(location.pathname);

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <header
            className="d-flex align-items-center justify-content-between px-4 sticky-top glass-panel rounded-0 border-top-0 border-start-0 border-end-0"
            style={{
                height: 'var(--header-height)',
                zIndex: 900
            }}
        >
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-link d-md-none me-3 p-1 text-decoration-none"
                    onClick={toggleSidebar}
                    style={{ color: 'var(--text-main)' }}
                >
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>
                <div className="d-flex align-items-center py-1">
                    <h5 className="m-0 fw-bold">{title}</h5>
                </div>
            </div>

            <div className="d-flex align-items-center gap-3" ref={headerRef}>
                {/* Search - Visual Only */}
                <div className="d-none d-sm-flex align-items-center rounded-pill px-3 py-2 border shadow-sm" style={{ width: '250px', backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)' }}>
                    <FontAwesomeIcon icon={faSearch} className="me-2" style={{ color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        className="border-0 w-100 bg-transparent"
                        style={{ outline: 'none', color: 'var(--text-main)' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px', background: 'var(--bg-panel)', color: currentTheme === 'light' ? '#f59e0b' : '#fbbf24' }}
                >
                    <FontAwesomeIcon icon={currentTheme === 'light' ? faMoon : faSun} />
                </button>

                {/* Notifications */}
                <div className="position-relative">
                    <button
                        className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center position-relative"
                        style={{ width: '40px', height: '40px', background: 'var(--bg-panel)', color: 'var(--text-muted)' }}
                        onClick={() => toggleDropdown('notifications')}
                    >
                        <FontAwesomeIcon icon={faBell} />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style={{ width: '10px', height: '10px' }}></span>
                    </button>
                    {activeDropdown === 'notifications' && (
                        <div className="dropdown-menu-custom d-block">
                            <h6 className="fw-bold mb-3 border-bottom pb-2" style={{ borderColor: 'var(--border-color)' }}>Reminders</h6>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex gap-2">
                                    <div className="mt-1"><div className="rounded-circle bg-primary" style={{ width: '8px', height: '8px' }}></div></div>
                                    <div>
                                        <p className="m-0 small fw-bold">Meeting with Dr. John</p>
                                        <p className="m-0 text-muted extra-small">Today, 3:00 PM</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <div className="mt-1"><div className="rounded-circle bg-warning" style={{ width: '8px', height: '8px' }}></div></div>
                                    <div>
                                        <p className="m-0 small fw-bold">Check specific patient #P-09</p>
                                        <p className="m-0 text-muted extra-small">Tomorrow, 10:00 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="position-relative d-flex align-items-center ms-2 cursor-pointer" onClick={() => toggleDropdown('profile')}>
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle overflow-hidden shadow-sm border border-2 border-primary" style={{ width: '40px', height: '40px' }}>
                            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-100 h-100 object-fit-cover" />
                        </div>
                        <div className="d-none d-md-block ms-2">
                            <p className="m-0 fw-bold small">Dr. Sarah</p>
                            <p className="m-0 text-muted extra-small" style={{ fontSize: '0.75rem' }}>Admin</p>
                        </div>
                    </div>

                    {activeDropdown === 'profile' && (
                        <div className="dropdown-menu-custom text-start d-block" onClick={(e) => e.stopPropagation()}>
                            <div className="d-flex align-items-center mb-3">
                                <div className="rounded-circle overflow-hidden shadow-sm me-3" style={{ width: '50px', height: '50px' }}>
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-100 h-100 object-fit-cover" />
                                </div>
                                <div>
                                    <h6 className="m-0 fw-bold">Dr. Sarah Wilson</h6>
                                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2">Administrator</span>
                                </div>
                            </div>
                            <div className="border-top pt-3" style={{ borderColor: 'var(--border-color)' }}>
                                <p className="mb-2 small text-muted"><span className="fw-bold text-main">Email:</span> sarah.w@hospital.com</p>
                                <p className="mb-2 small text-muted"><span className="fw-bold text-main">Phone:</span> +1 (555) 123-4567</p>
                                <p className="mb-0 small text-muted"><span className="fw-bold text-main">ID:</span> ADM-001</p>
                            </div>
                            <div className="border-top mt-3 pt-3 text-center" style={{ borderColor: 'var(--border-color)' }}>
                                <button className="btn btn-sm btn-outline-danger w-100 rounded-pill" onClick={handleLogout}>Sign Out</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
