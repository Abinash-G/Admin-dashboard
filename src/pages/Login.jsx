import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="row g-0 vh-100" style={{ background: 'var(--bg-body)' }}>
            {/* Left Side - Desktop Branding */}
            <div className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center text-white p-5 position-relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--primary), #8b5cf6)' }}>
                {/* Decorative Circles */}
                <div className="position-absolute rounded-circle opacity-10" style={{ width: '300px', height: '300px', top: '-50px', left: '-50px', backgroundColor: 'var(--primary)' }}></div>
                <div className="position-absolute rounded-circle opacity-10" style={{ width: '200px', height: '200px', bottom: '10%', right: '10%', backgroundColor: 'var(--primary)' }}></div>

                <div className="d-inline-flex align-items-center justify-content-center bg-white bg-opacity-20 rounded-circle mb-4 shadow-lg backdrop-blur" style={{ width: '120px', height: '120px' }}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className="fw-bold display-5 mb-2">MedAdmin</h1>
                <p className="lead opacity-75 text-center" style={{ maxWidth: '400px' }}>Streamline your hospital operations with our advanced management system.</p>
            </div>

            {/* Right Side - Login Form */}
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4">
                <div className="glass-panel p-5 shadow-lg animate-fade-in" style={{ width: '100%', maxWidth: '450px' }}>

                    {/* Mobile Branding (Hidden on Desktop) */}
                    <div className="text-center mb-5 d-md-none">
                        <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{ width: '60px', height: '60px' }}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="fw-bold mb-1">MedAdmin</h3>
                        <p className="text-muted small">Hospital Management System</p>
                    </div>

                    {/* Desktop Header (Hidden on Mobile) */}
                    <div className="mb-5 d-none d-md-block">
                        <h2 className="fw-bold">Welcome Back</h2>
                        <p className="text-muted">Please sign in to continue accessing your dashboard.</p>
                    </div>

                    <form>
                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text border-end-0" style={{ background: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    type="email"
                                    className="form-control border-start-0 ps-3"
                                    style={{ background: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    placeholder="name@hospital.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="d-flex justify-content-between">
                                <label className="form-label small fw-bold text-muted text-uppercase">Password</label>
                                <a href="#" className="small text-primary-custom text-decoration-none">Forgot?</a>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text border-end-0" style={{ background: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type="password"
                                    className="form-control border-start-0 ps-3"
                                    style={{ background: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Link to="/" className="btn btn-primary-custom w-100 rounded-pill py-2 fw-bold shadow-sm mb-3">
                            Sign In
                        </Link>
                    </form>

                    <div className="text-center mt-4 text-muted small">
                        Don't have an account? <span className="text-primary-custom fw-bold cursor-pointer">Contact Admin</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
