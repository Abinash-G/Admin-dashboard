import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faCalendarCheck,
    faUserInjured,
    faStar,
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faDollarSign,
    faUser,
    faVenusMars,
    faEdit,
    faCheck,
    faTimes,
    faCamera,
    faGraduationCap,
    faBriefcase
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import doctorsList from '../data/doctors.json';

const DoctorDetails = () => {
    const { id } = useParams();
    const initialDoctor = doctorsList.find(d => d.id == id) || doctorsList[0];

    const [doctor, setDoctor] = useState(initialDoctor);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialDoctor);

    const formatCurrency = (value) => {
        if (typeof value === 'string') value = parseFloat(value.replace(/[₹,]/g, '')) || 0;
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}C`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
        return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    const handleSave = () => {
        setDoctor(formData);
        setIsEditing(false);
        console.log('Saved Doctor:', formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const salaryVal = parseFloat((doctor.salary || '0').toString().replace(/[₹,]/g, '')) || 0;

    const stats = [
        { label: 'Total Patients', value: doctor.patients || '0', icon: faUserInjured, color: 'text-primary' },
        { label: 'Rating', value: `${doctor.rating}/5`, icon: faStar, color: 'text-success' },
        { label: 'Monthly Salary', value: formatCurrency(salaryVal), icon: faDollarSign, color: 'text-warning' },
    ];

    const chartData = [
        { day: 'Mon', new: 12, follow: 8 },
        { day: 'Tue', new: 19, follow: 12 },
        { day: 'Wed', new: 3, follow: 15 },
        { day: 'Thu', new: 5, follow: 10 },
        { day: 'Fri', new: 2, follow: 18 },
        { day: 'Sat', new: 3, follow: 5 },
    ];

    return (
        <div className="animate-fade-in container-fluid p-0 pb-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <Link to="/doctors" className="btn btn-light rounded-circle shadow-sm me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <h4 className="fw-bold m-0">Doctor Details</h4>
                </div>
                {isEditing ? (
                    <div className="d-flex gap-2">
                        <button className="btn btn-light shadow-sm btn-sm px-3 rounded-pill" onClick={() => { setIsEditing(false); setFormData(doctor); }}>
                            <FontAwesomeIcon icon={faTimes} className="me-2 text-danger" />
                            Cancel
                        </button>
                        <button className="btn btn-success shadow-sm btn-sm px-4 rounded-pill" onClick={handleSave}>
                            <FontAwesomeIcon icon={faCheck} className="me-2" />
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <button className="btn btn-primary-custom shadow-sm btn-sm px-3 rounded-pill" onClick={() => setIsEditing(true)}>
                        <FontAwesomeIcon icon={faEdit} className="me-2" />
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="row g-4">
                {/* Profile Card */}
                <div className="col-12 col-xl-4">
                    <div className="glass-panel p-4 mb-4 text-center">
                        <div className="position-relative d-inline-block mb-3">
                            <img
                                src={isEditing ? formData.img : doctor.img}
                                alt={doctor.name}
                                className="rounded-circle shadow-sm border border-4 border-white border-opacity-25"
                                width="120"
                                height="120"
                                style={{ objectFit: 'cover' }}
                            />
                            {isEditing && (
                                <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '32px', height: '32px', cursor: 'pointer', border: '2px solid white' }}>
                                    <FontAwesomeIcon icon={faCamera} style={{ fontSize: '14px' }} />
                                </div>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="mb-3">
                                <label className="extra-small fw-bold text-muted d-block mb-1">Image URL</label>
                                <input type="text" className="form-control form-control-sm text-center mb-2 shadow-sm" name="img" value={formData.img} onChange={handleChange} placeholder="Image URL" style={{ background: 'var(--bg-body)', fontSize: '0.75rem' }} />
                                <input type="text" className="form-control text-center fw-bold mb-2 shadow-sm" name="name" value={formData.name} onChange={handleChange} placeholder="Doctor Name" style={{ background: 'var(--bg-body)' }} />
                                <input type="text" className="form-control form-control-sm text-center shadow-sm" name="role" value={formData.role} onChange={handleChange} placeholder="Role / Specialty" style={{ background: 'var(--bg-body)' }} />
                            </div>
                        ) : (
                            <>
                                <h5 className="fw-bold m-0">{doctor.name}</h5>
                                <p className="text-muted small">{doctor.role}</p>
                                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-4">
                                    Available
                                </span>
                            </>
                        )}

                        <div className="text-start mt-4 border-top pt-4" style={{ borderColor: 'var(--border-color)' }}>
                            <h6 className="fw-bold small text-uppercase text-muted mb-3">About & Bio</h6>
                            {isEditing ? (
                                <textarea className="form-control form-control-sm mb-3 shadow-sm" name="bio" value={formData.bio} onChange={handleChange} rows="4" style={{ background: 'var(--bg-body)' }} placeholder="Brief biography..."></textarea>
                            ) : (
                                <p className="small text-muted mb-4" style={{ lineHeight: '1.6' }}>
                                    {doctor.bio || `${doctor.name} is a seasoned ${doctor.role.toLowerCase()} with extensive experience.`}
                                </p>
                            )}

                            <h6 className="fw-bold small text-uppercase text-muted mb-3">Personal Details</h6>
                            <div className="row g-2 mb-3">
                                <div className="col-6">
                                    <div className="d-flex align-items-center small text-muted">
                                        <FontAwesomeIcon icon={faUser} className="me-2 opacity-50" width="14" />
                                        {isEditing ? (
                                            <input type="number" className="form-control form-control-sm" name="age" value={formData.age} onChange={handleChange} />
                                        ) : (
                                            `${doctor.age} Years`
                                        )}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center small text-muted">
                                        <FontAwesomeIcon icon={faVenusMars} className="me-2 opacity-50" width="14" />
                                        {isEditing ? (
                                            <select className="form-select form-select-sm" name="gender" value={formData.gender} onChange={handleChange}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        ) : (
                                            doctor.gender
                                        )}
                                    </div>
                                </div>
                            </div>

                            <h6 className="fw-bold small text-uppercase text-muted mb-3">Professional Info</h6>
                            <div className="mb-3">
                                <div className="d-flex align-items-center small text-muted mb-2">
                                    <FontAwesomeIcon icon={faGraduationCap} className="me-3 opacity-50" width="16" />
                                    {isEditing ? (
                                        <input type="text" className="form-control form-control-sm" name="education" value={formData.education} onChange={handleChange} />
                                    ) : (
                                        doctor.education || 'Education not listed'
                                    )}
                                </div>
                                <div className="d-flex align-items-center small text-muted">
                                    <FontAwesomeIcon icon={faBriefcase} className="me-3 opacity-50" width="16" />
                                    {isEditing ? (
                                        <input type="text" className="form-control form-control-sm" name="experience" value={formData.experience} onChange={handleChange} />
                                    ) : (
                                        `${doctor.experience || 'N/A'}`
                                    )}
                                </div>
                            </div>

                            <h6 className="fw-bold small text-uppercase text-muted mb-3">Contact Details</h6>
                            <div className="mb-2">
                                <div className="d-flex align-items-center mb-2 small text-muted">
                                    <FontAwesomeIcon icon={faPhone} className="me-3 opacity-50" width="16" />
                                    {isEditing ? (
                                        <input type="text" className="form-control form-control-sm" name="mobile" value={formData.mobile} onChange={handleChange} />
                                    ) : (
                                        doctor.mobile || '+91 00000 00000'
                                    )}
                                </div>
                                <div className="d-flex align-items-center small text-muted">
                                    <FontAwesomeIcon icon={faEnvelope} className="me-3 opacity-50" width="16" />
                                    {isEditing ? (
                                        <input type="email" className="form-control form-control-sm" name="email" value={formData.email} onChange={handleChange} />
                                    ) : (
                                        doctor.email || 'doctor@hospital.com'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-12 col-xl-8">
                    <div className="row g-4 mb-4">
                        {stats.map((s, i) => (
                            <div key={i} className="col-md-4">
                                <div className="glass-panel p-4 d-flex align-items-center justify-content-between h-100">
                                    <div className="me-3">
                                        <p className="text-muted small mb-1">{s.label}</p>
                                        <h4 className="fw-bold m-0">{s.value}</h4>
                                    </div>
                                    <div className={`rounded-circle bg-opacity-10 p-3 flex-shrink-0 ${s.color === 'text-primary' ? 'bg-primary text-primary' : s.color === 'text-success' ? 'bg-success text-success' : 'bg-warning text-warning'}`}>
                                        <FontAwesomeIcon icon={s.icon} size="lg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold m-0">Appointment Trends</h6>
                            <span className="small text-muted fw-bold">Daily Statistics</span>
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} barSize={20}>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: 'var(--bg-panel)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="new" name="New Patient" stackId="a" fill="var(--secondary)" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="follow" name="Follow Up" stackId="a" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
