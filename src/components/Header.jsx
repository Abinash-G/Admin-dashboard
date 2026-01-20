import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun, faBell, faSearch, faPalette, faCheck } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleTheme, currentTheme, setPrimaryColor, setAccentColor, primaryColor, toggleSidebar, searchQuery, setSearchQuery }) => {
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

    const colorPresets = [
        { name: 'Purple', primary: '#7c3aed', accent: '#c026d3' },
        { name: 'Red', primary: '#ef4444', accent: '#b91c1c' },
        { name: 'Blue', primary: '#3b82f6', accent: '#1d4ed8' },
        { name: 'Green', primary: '#10b981', accent: '#047857' },
        { name: 'Yellow', primary: '#f59e0b', accent: '#d97706' },
        { name: 'Pink', primary: '#ec4899', accent: '#be185d' },
        { name: 'Orange', primary: '#f97316', accent: '#c2410c' }
    ];

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    const adjustColor = (hex, amount) => {
        let col = hex.replace('#', '');
        let r = parseInt(col.substring(0, 2), 16);
        let g = parseInt(col.substring(2, 4), 16);
        let b = parseInt(col.substring(4, 6), 16);

        const shift = (v) => Math.max(0, Math.min(255, v + amount));

        const rs = shift(r).toString(16).padStart(2, '0');
        const gs = shift(g).toString(16).padStart(2, '0');
        const bs = shift(b).toString(16).padStart(2, '0');

        return `#${rs}${gs}${bs}`;
    };

    const handleColorChange = (preset) => {
        setPrimaryColor(preset.primary);
        setAccentColor(preset.accent);
        setActiveDropdown(null);
    };

    const handleCustomColorChange = (val) => {
        setPrimaryColor(val);
        // Create a vibrant accent by shifting the hue/brightness
        setAccentColor(adjustColor(val, 40));
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
                    title="Toggle Dark/Light Mode"
                >
                    <FontAwesomeIcon icon={currentTheme === 'light' ? faMoon : faSun} />
                </button>

                {/* Color Customizer */}
                <div className="position-relative">
                    <button
                        onClick={() => toggleDropdown('colors')}
                        className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px', background: 'var(--bg-panel)', color: 'var(--primary)' }}
                        title="Change Theme Color"
                    >
                        <FontAwesomeIcon icon={faPalette} />
                    </button>
                    {activeDropdown === 'colors' && (
                        <div className="dropdown-menu-custom d-block" style={{ minWidth: '220px', padding: '1.25rem' }}>
                            <h6 className="fw-bold mb-3 border-bottom pb-2" style={{ borderColor: 'var(--border-color)', fontSize: '0.9rem' }}>Theme Color</h6>
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                {colorPresets.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => handleColorChange(preset)}
                                        className="rounded-circle border-0 d-flex align-items-center justify-content-center transition-all shadow-sm"
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            padding: 0,
                                            background: preset.primary,
                                            transform: primaryColor === preset.primary ? 'scale(1.2)' : 'scale(1)',
                                            boxShadow: primaryColor === preset.primary ? `0 0 10px ${preset.primary}` : 'none',
                                            border: primaryColor === preset.primary ? '2px solid white' : 'none'
                                        }}
                                        title={preset.name}
                                    >
                                        {primaryColor === preset.primary && (
                                            <FontAwesomeIcon icon={faCheck} style={{ color: 'white', fontSize: '10px' }} />
                                        )}
                                    </button>
                                ))}

                                {/* Custom Color Picker */}
                                <div className="position-relative">
                                    <label
                                        className="rounded-circle border-0 d-flex align-items-center justify-content-center transition-all shadow-sm cursor-pointer"
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                                            border: !colorPresets.some(p => p.primary === primaryColor) ? '2px solid white' : 'none',
                                            transform: !colorPresets.some(p => p.primary === primaryColor) ? 'scale(1.2)' : 'scale(1)',
                                            boxShadow: !colorPresets.some(p => p.primary === primaryColor) ? `0 0 10px ${primaryColor}` : 'none',
                                        }}
                                        title="Pick Custom Color"
                                    >
                                        <input
                                            type="color"
                                            className="position-absolute opacity-0 w-100 h-100 cursor-pointer"
                                            value={primaryColor}
                                            onChange={(e) => handleCustomColorChange(e.target.value)}
                                        />
                                        {!colorPresets.some(p => p.primary === primaryColor) && (
                                            <FontAwesomeIcon icon={faCheck} style={{ color: 'white', fontSize: '10px', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }} />
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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
