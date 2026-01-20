import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPhone, faEnvelope, faPlus, faTimes, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import doctorsList from '../data/doctors.json';

const DoctorCard = ({ id, name, role, rating, img, patients }) => (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
        <div className="glass-panel p-4 h-100 card-hoverable text-center d-flex flex-column">
            <div className="position-relative d-inline-block mb-3 align-self-center">
                <img
                    src={img}
                    alt={name}
                    className="rounded-circle border border-3 border-white border-opacity-25 shadow-sm"
                    width="100"
                    height="100"
                    style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1" style={{ width: '15px', height: '15px' }}></div>
            </div>

            <h5 className="fw-bold mb-1">{name}</h5>
            <p className="text-muted small mb-3">{role}</p>

            <div className="d-flex justify-content-center align-items-center mb-3 text-warning mt-auto">
                {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} size="sm" className={i < rating ? '' : 'text-muted opacity-25'} />
                ))}
            </div>

            <div className="d-flex justify-content-around mb-4 border-top border-bottom py-2" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-center">
                    <span className="d-block fw-bold">{patients || '0'}</span>
                    <span className="text-muted extra-small">Patients</span>
                </div>
                <div className="text-center">
                    <span className="d-block fw-bold">{rating}</span>
                    <span className="text-muted extra-small">Rating</span>
                </div>
            </div>

            <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-sm rounded-circle shadow-sm text-secondary-custom hover-scale d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', background: 'var(--bg-body)', borderColor: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
                    <FontAwesomeIcon icon={faPhone} />
                </button>
                <button className="btn btn-sm rounded-circle shadow-sm text-secondary-custom hover-scale d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', background: 'var(--bg-body)', borderColor: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </button>
                <Link to={`/doctors/${id}`} className="btn btn-primary-custom btn-sm rounded-pill px-3 text-decoration-none">
                    Profile
                </Link>
            </div>
        </div>
    </div>
);

const Doctors = () => {
    const [doctors, setDoctors] = useState(doctorsList);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        gender: 'Male',
        experience: '',
        education: '',
        salary: '',
        img: '',
        rating: 5,
        patients: '0',
        mobile: '',
        email: '',
        bio: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddDoctor = (e) => {
        e.preventDefault();
        const maxId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) : 0;
        const newDoctor = {
            id: maxId + 1,
            ...formData,
            patients: '0',
            img: formData.img || `https://randomuser.me/api/portraits/${formData.gender === 'Male' ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`
        };
        setDoctors([newDoctor, ...doctors]);
        setShowModal(false);
        setFormData({ name: '', role: '', gender: 'Male', experience: '', education: '', salary: '', img: '', rating: 5, mobile: '', email: '', bio: '' });
    };

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in pb-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h4 className="fw-bold mb-1">Our Specialists</h4>
                    <p className="text-muted m-0 small">Meet our team of world-class medical experts</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <div className="input-group shadow-sm rounded-pill overflow-hidden border" style={{ maxWidth: '300px', backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', height: '38px' }}>
                        <span className="input-group-text bg-transparent border-0 pe-0 text-muted">
                            <FontAwesomeIcon icon={faSearch} size="sm" />
                        </span>
                        <input
                            type="text"
                            className="form-control bg-transparent border-0 shadow-none text-small"
                            placeholder="Search doctor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary-custom shadow-sm rounded-pill px-3 text-nowrap" style={{ height: '38px', fontSize: '14px' }} onClick={() => setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add Doctor
                    </button>
                </div>
            </div>

            <div className="row">
                {filteredDoctors.map((doc, i) => (
                    <DoctorCard key={i} {...doc} />
                ))}
            </div>

            {/* Add Doctor Modal */}
            {showModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start justify-content-center px-3 pt-5" style={{ zIndex: 1050, backdropFilter: 'blur(4px)', overflowY: 'auto' }}>
                    <div className="glass-panel p-4 w-100 shadow-lg animate-fade-in my-4" style={{ maxWidth: '600px', backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', maxHeight: 'fit-content' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                            <h5 className="fw-bold m-0">Register New Doctor</h5>
                            <button className="btn btn-link p-0 text-decoration-none text-muted" onClick={() => setShowModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <form onSubmit={handleAddDoctor}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Full Name</label>
                                <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Dr. Jane Smith" />
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Specialty / Role</label>
                                    <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="role" value={formData.role} onChange={handleInputChange} placeholder="e.g. Cardiologist" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Gender</label>
                                    <select className="form-select" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="gender" value={formData.gender} onChange={handleInputChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Education</label>
                                    <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="education" value={formData.education} onChange={handleInputChange} placeholder="e.g. MBBS, MD" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Experience</label>
                                    <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="experience" value={formData.experience} onChange={handleInputChange} placeholder="e.g. 10 Years" />
                                </div>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Mobile Number</label>
                                    <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="+91 9XXXX XXXXX" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Email Address</label>
                                    <input required type="email" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="email" value={formData.email} onChange={handleInputChange} placeholder="doctor@hospital.com" />
                                </div>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Monthly Salary</label>
                                    <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="salary" value={formData.salary} onChange={handleInputChange} placeholder="e.g. ₹2,50,000" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Rating (1-5)</label>
                                    <input required type="number" min="1" max="5" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="rating" value={formData.rating} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Short Bio</label>
                                <textarea className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Brief background of the doctor..." rows="2"></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">Profile Photo (URL) - Optional</label>
                                <input type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="img" value={formData.img} onChange={handleInputChange} placeholder="https://..." />
                            </div>

                            <div className="d-flex justify-content-end gap-2 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                                <button type="button" className="btn btn-light px-4 border" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary-custom px-4">Register Doctor</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;
