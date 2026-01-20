import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    const [theme, setTheme] = useState('light');
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setSidebarOpen(true); // Default open on desktop
            } else {
                setSidebarOpen(false); // Default closed on mobile
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Responsive Sidebar Styles
    const sidebarStyle = isMobile ? {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '250px',
        zIndex: 1050,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        backgroundColor: 'var(--bg-panel)',
        borderRight: '1px solid var(--border-color)',
    } : {
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: sidebarOpen ? 'var(--sidebar-width)' : '80px',
        transition: 'width 0.3s ease',
        backgroundColor: 'var(--bg-panel)',
        borderRight: '1px solid var(--border-color)',
        zIndex: 1000,
        flexShrink: 0
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-body)' }}>
            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div style={sidebarStyle}>
                <Sidebar collapsed={!isMobile && !sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
                <Header
                    toggleTheme={toggleTheme}
                    currentTheme={theme}
                    toggleSidebar={toggleSidebar}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <main className="flex-grow-1 p-4">
                    <Outlet context={{ searchQuery, setSearchQuery }} />
                </main>
            </div>
        </div>
    );
};

export default Layout;
