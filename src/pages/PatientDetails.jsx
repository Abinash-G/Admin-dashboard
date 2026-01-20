import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faCalendarCheck,
    faFileMedical,
    faWeight,
    faRulerVertical,
    faTint,
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faEdit,
    faCheck,
    faTimes,
    faCamera,
    faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import patientsList from '../data/patients.json';

const PatientDetails = () => {
    const { id } = useParams();
    const initialPatient = patientsList.find(p => p.id.replace('#', '') === id) || patientsList[0];

    const [patient, setPatient] = useState(initialPatient);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialPatient);

    const formatCurrency = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}C`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
        return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    const handleSave = () => {
        setPatient(formData);
        setIsEditing(false);
        console.log('Saved:', formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const billVal = parseFloat((patient.billAmount || '0').toString().replace(/[₹,]/g, '')) || 0;

    const vitals = [
        { label: 'Weight', value: '75 kg', icon: faWeight, color: 'text-primary' },
        { label: 'Height', value: '175 cm', icon: faRulerVertical, color: 'text-info' },
        { label: 'Blood Type', value: patient.bloodGroup || 'O+', icon: faTint, color: 'text-danger' },
        { label: 'Glucose', value: '92 mg/dL', icon: faFileMedical, color: 'text-warning' },
        { label: 'Total Bill', value: formatCurrency(billVal), icon: faFileInvoiceDollar, color: 'text-success' },
    ];

    const healthHistory = [
        { date: 'Oct 24, 2023', condition: patient.issue || 'Consultation', doctor: patient.doctor || 'Dr. Sarah Wilson', treatment: 'Follow-up' },
        { date: 'Sep 10, 2023', condition: 'Regular Checkup', doctor: patient.doctor || 'Dr. Ramesh', treatment: 'Routine analysis' },
        { date: 'Aug 05, 2023', condition: 'Viral Fever', doctor: 'Dr. Sarah Wilson', treatment: 'Antibiotics' },
    ];

    const bpData = [
        { time: '08:00', sys: 120, dia: 80 },
        { time: '12:00', sys: 125, dia: 82 },
        { time: '16:00', sys: 118, dia: 78 },
        { time: '20:00', sys: 122, dia: 81 },
    ];

    return (
        <div className="animate-fade-in container-fluid p-0 pb-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <Link to="/patients" className="btn btn-light rounded-circle shadow-sm me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <h4 className="fw-bold m-0">Patient Details</h4>
                </div>
                {isEditing ? (
                    <div className="d-flex gap-2">
                        <button className="btn btn-light shadow-sm btn-sm px-3 rounded-pill" onClick={() => { setIsEditing(false); setFormData(patient); }}>
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
                        Edit Patient
                    </button>
                )}
            </div>

            <div className="row g-4">
                <div className="col-12 col-xl-4">
                    <div className="glass-panel p-4 mb-4 text-center">
                        <div className="position-relative d-inline-block mb-3">
                            <img
                                src={isEditing ? formData.img : patient.img}
                                alt={patient.name}
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
                                <input type="text" className="form-control text-center fw-bold mb-2 shadow-sm" name="name" value={formData.name} onChange={handleChange} style={{ background: 'var(--bg-body)' }} />
                                <div className="d-flex gap-2 justify-content-center">
                                    <input type="number" className="form-control form-control-sm text-center shadow-sm" name="age" value={formData.age} onChange={handleChange} style={{ width: '80px', background: 'var(--bg-body)' }} />
                                    <select className="form-select form-select-sm shadow-sm" name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100px', background: 'var(--bg-body)' }}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h5 className="fw-bold m-0">{patient.name}</h5>
                                <p className="text-muted small mb-3">ID: {patient.id}</p>
                                <div className="d-flex justify-content-center gap-2 mb-4">
                                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                                        {patient.age} Years
                                    </span>
                                    <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill">
                                        {patient.gender}
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="text-start mt-4 border-top pt-4" style={{ borderColor: 'var(--border-color)' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-bold small text-uppercase text-muted m-0">Contact Details</h6>
                                {isEditing && <span className="extra-small text-primary">Editing Info</span>}
                            </div>

                            <div className="mb-3">
                                <label className="extra-small fw-bold text-muted d-block mb-1">Mobile Number</label>
                                <div className="d-flex align-items-center small text-muted">
                                    <FontAwesomeIcon icon={faPhone} className="me-3 opacity-50" width="16" />
                                    {isEditing ? (
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom rounded-0 p-0 shadow-none" name="mobile" value={formData.mobile} onChange={handleChange} style={{ background: 'transparent' }} />
                                    ) : (
                                        patient.mobile || '+91 00000 00000'
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="extra-small fw-bold text-muted d-block mb-1">Email Address</label>
                                <div className="d-flex align-items-center small text-muted">
                                    <FontAwesomeIcon icon={faEnvelope} className="me-3 opacity-50" width="16" />
                                    {isEditing ? (
                                        <input type="email" className="form-control form-control-sm border-0 border-bottom rounded-0 p-0 shadow-none" name="email" value={formData.email} onChange={handleChange} style={{ background: 'transparent' }} />
                                    ) : (
                                        patient.email || `${patient.name.toLowerCase().replace(' ', '.')}@example.com`
                                    )}
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="extra-small fw-bold text-muted d-block mb-1">Home Address</label>
                                <div className="d-flex align-items-start small text-muted">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 mt-1 opacity-50" width="16" />
                                    {isEditing ? (
                                        <textarea className="form-control form-control-sm border-0 border-bottom rounded-0 p-0 shadow-none" name="address" value={formData.address} onChange={handleChange} rows="2" style={{ background: 'transparent' }}></textarea>
                                    ) : (
                                        patient.address || 'Address not provided'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold m-0">Upcoming Appointments</h6>
                            <FontAwesomeIcon icon={faCalendarCheck} className="text-muted" />
                        </div>
                        <div className="card border-0 shadow-sm p-3 mb-2" style={{ background: 'var(--bg-body)' }}>
                            <div className="d-flex align-items-center">
                                <div className="me-3 text-center text-primary-custom lh-1">
                                    <span className="d-block fw-bold fs-5">25</span>
                                    <span className="small text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Oct</span>
                                </div>
                                <div>
                                    <h6 className="fw-bold m-0 small">General Checkup</h6>
                                    <p className="text-muted extra-small m-0">Dr. Sarah Wilson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-8">
                    <div className="row g-4 mb-4 justify-content-center">
                        {vitals.map((v, i) => (
                            <div key={i} className="col-6 col-md-4">
                                <div className="glass-panel p-3 d-flex flex-column align-items-center text-center h-100 justify-content-center">
                                    <div className={`rounded-circle bg-opacity-10 p-2 mb-2 ${v.color === 'text-primary' ? 'bg-primary text-primary' : v.color === 'text-info' ? 'bg-info text-info' : v.color === 'text-danger' ? 'bg-danger text-danger' : 'bg-warning text-warning'}`}>
                                        <FontAwesomeIcon icon={v.icon} size="lg" />
                                    </div>
                                    <h6 className="fw-bold m-0">{v.value}</h6>
                                    <small className="text-muted">{v.label}</small>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel p-4 mb-4">
                        <h6 className="fw-bold mb-4">Blood Pressure History</h6>
                        <div style={{ height: '200px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={bpData}>
                                    <defs>
                                        <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderRadius: '8px', border: 'none' }} />
                                    <Area type="monotone" dataKey="sys" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorSys)" name="Systolic" />
                                    <Area type="monotone" dataKey="dia" stroke="#3b82f6" strokeWidth={2} fillOpacity={0.1} fill="#3b82f6" name="Diastolic" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-panel p-4">
                        <h6 className="fw-bold mb-4">Medical History</h6>
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle mb-0" style={{ color: 'var(--text-main)' }}>
                                <thead className="border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                                    <tr className="text-muted text-uppercase small">
                                        <th scope="col" className="ps-0">Date</th>
                                        <th scope="col">Condition</th>
                                        <th scope="col">Doctor</th>
                                        <th scope="col" className="text-end">Treatment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {healthHistory.map((h, i) => (
                                        <tr key={i} style={{ borderBottom: i === healthHistory.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                                            <td className="ps-0 py-3 text-muted small">{h.date}</td>
                                            <td className="fw-bold small">{h.condition}</td>
                                            <td className="small">{h.doctor}</td>
                                            <td className="text-end small text-muted">{h.treatment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
