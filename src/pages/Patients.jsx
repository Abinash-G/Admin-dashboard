import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faEllipsisH, faPlus, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import patientsList from '../data/patients.json';

const Patients = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState(patientsList);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        issue: '',
        doctor: '',
        status: 'Outpatient',
        mobile: '',
        email: '',
        bloodGroup: 'O+',
        address: '',
        img: ''
    });

    const { searchQuery, setSearchQuery } = useOutletContext();
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterGender, setFilterGender] = useState('All');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilterMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = (patient.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (patient.id?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All' || patient.status === filterStatus;
        const matchesGender = filterGender === 'All' || patient.gender === filterGender;
        return matchesSearch && matchesStatus && matchesGender;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Admitted': return 'badge bg-warning text-dark';
            case 'Outpatient': return 'badge bg-success';
            case 'Inpatient': return 'badge bg-danger';
            default: return 'badge bg-secondary';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        const newPatient = {
            id: `#P-00${patients.length + 1}`,
            ...formData,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            img: formData.img || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 15) + 1}`
        };
        setPatients([newPatient, ...patients]);
        setShowModal(false);
        setFormData({
            name: '',
            age: '',
            gender: 'Male',
            issue: '',
            doctor: '',
            status: 'Outpatient',
            mobile: '',
            email: '',
            bloodGroup: 'O+',
            address: '',
            img: ''
        });
    };

    return (
        <div className="animate-fade-in position-relative">
            <style>
                {`
                    @media (min-width: 768px) {
                        .w-md-auto {
                            width: auto !important;
                        }
                    }
                    @media (max-width: 767.98px) {
                        .m-hide {
                            display: none !important;
                        }
                        .pc-hide {
                            display: block !important;
                        }
                    }
                    @media (min-width: 768px) {
                         .pc-hide {
                            display: none !important;
                         }
                    }
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            {/* Modal Overlay */}
            {showModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start justify-content-center px-3 pt-5" style={{ zIndex: 1050, backdropFilter: 'blur(4px)', overflowY: 'auto' }}>
                    <div className="glass-panel p-4 w-100 shadow-lg animate-fade-in my-4" style={{ maxWidth: '500px', backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                            <h5 className="fw-bold m-0" style={{ color: 'var(--text-main)' }}>Add New Patient</h5>
                            <button className="btn btn-link p-0 text-decoration-none" style={{ color: 'var(--text-main)' }} onClick={() => setShowModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <form onSubmit={handleAddPatient}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Full Name</label>
                                <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. John Doe" />
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Age</label>
                                    <input required type="number" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="age" value={formData.age} onChange={handleInputChange} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Gender</label>
                                    <select className="form-select" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="gender" value={formData.gender} onChange={handleInputChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Medical Issue</label>
                                <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="issue" value={formData.issue} onChange={handleInputChange} placeholder="e.g. Fever, Fracture" />
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Assigned Doctor</label>
                                    <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="doctor" value={formData.doctor} onChange={handleInputChange} placeholder="e.g. Dr. Smith" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Mobile Number</label>
                                    <input required type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="+91 9XXXX XXXXX" />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-8">
                                    <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                                    <input required type="email" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                                </div>
                                <div className="col-4">
                                    <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Blood Group</label>
                                    <select className="form-select" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Full Address</label>
                                <textarea className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter street, city, etc." rows="2"></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Patient Photo (URL)</label>
                                <input type="text" className="form-control" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="img" value={formData.img} onChange={handleInputChange} placeholder="https://example.com/photo.jpg" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted" style={{ color: 'var(--text-muted)' }}>Status</label>
                                <select className="form-select" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} name="status" value={formData.status} onChange={handleInputChange}>
                                    <option value="Outpatient">Outpatient</option>
                                    <option value="Inpatient">Inpatient</option>
                                    <option value="Admitted">Admitted</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-end gap-2 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                                <button type="button" className="btn btn-light px-4" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary-custom px-4">Add Patient</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                    <h4 className="fw-bold mb-1">Patients List</h4>
                    <p className="text-muted m-0">Manage your hospital patients</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary-custom shadow-sm w-100 w-md-auto py-2 px-4 py-md-1 px-md-3 d-flex align-items-center justify-content-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Patient
                </button>
            </div>

            <div className="glass-panel p-4 mb-4">
                <div className="row g-3 mb-4">
                    <div className="col-md-6 col-lg-4">
                        <div className="d-flex align-items-center rounded-pill px-3 py-2 border shadow-sm w-100" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--border-color)' }}>
                            <FontAwesomeIcon icon={faSearch} className="me-2" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search patient name, id..."
                                className="border-0 bg-transparent w-100"
                                style={{ outline: 'none', color: 'var(--text-main)' }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-2 ms-auto position-relative" ref={filterRef}>
                        <button
                            className="btn btn-light w-100 d-flex align-items-center justify-content-center shadow-sm text-muted"
                            style={{ background: 'var(--bg-body)', color: 'var(--text-muted)' }}
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                        >
                            <FontAwesomeIcon icon={faFilter} className="me-2" />
                            Filter
                            <FontAwesomeIcon icon={faChevronDown} className="ms-2" size="xs" />
                        </button>

                        {/* Filter Menu */}
                        {showFilterMenu && (
                            <div className="position-absolute top-100 end-0 mt-2 p-3 rounded shadow-lg animate-fade-in border"
                                style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', width: '250px', zIndex: 1000 }}>
                                <div className="mb-3">
                                    <label className="small fw-bold text-muted mb-2 d-block">Status</label>
                                    <div className="custom-dropdown-options">
                                        {['All', 'Outpatient', 'Inpatient', 'Admitted'].map(status => (
                                            <button
                                                key={status}
                                                className={`custom-dropdown-btn ${filterStatus === status ? 'active' : ''}`}
                                                onClick={() => setFilterStatus(status)}
                                            >
                                                {status === 'All' ? 'All Statuses' : status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="small fw-bold text-muted mb-2 d-block">Gender</label>
                                    <div className="custom-dropdown-options">
                                        {['All', 'Male', 'Female'].map(gender => (
                                            <button
                                                key={gender}
                                                className={`custom-dropdown-btn ${filterGender === gender ? 'active' : ''}`}
                                                onClick={() => setFilterGender(gender)}
                                            >
                                                {gender === 'All' ? 'All Genders' : gender}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className="btn btn-sm btn-light w-100 text-primary-custom fw-bold"
                                    onClick={() => { setFilterGender('All'); setFilterStatus('All'); setSearchQuery(''); setShowFilterMenu(false); }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="table-responsive no-scrollbar" style={{ minHeight: '400px' }}>
                    <table className="table table-borderless align-middle" style={{ color: 'var(--text-main)' }}>
                        <thead className="border-bottom d-none d-md-table-header-group" style={{ borderColor: 'var(--border-color)' }}>
                            <tr className="text-muted text-uppercase small">
                                <th scope="col" className="ps-3">Patient Name</th>
                                <th scope="col" className="m-hide">ID</th>
                                <th scope="col" className="m-hide">Age</th>
                                <th scope="col" className="m-hide">Doctor</th>
                                <th scope="col" className="m-hide">Date</th>
                                <th scope="col" className="m-hide">Status</th>
                                <th scope="col" className="text-end pe-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((p, i) => (
                                <tr key={i} className="hover-bg-subtle cursor-pointer position-relative" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                                    <td className="ps-3 py-2 py-md-3" onClick={() => navigate(`/patients/${p.id.replace('#', '')}`)}>
                                        <div className="d-flex align-items-center overflow-hidden">
                                            <img src={p.img} alt={p.name} className="rounded-circle me-3 flex-shrink-0" width="40" height="40" />
                                            <div className="overflow-hidden">
                                                <h6 className="m-0 fw-bold text-primary-custom text-truncate">{p.name}</h6>
                                                <small className="text-muted d-block d-md-none opacity-75 text-truncate">{p.issue}</small>
                                                <div className="pc-hide mt-1">
                                                    <span className={`${getStatusBadge(p.status)} scale-75 origin-left`} style={{ fontSize: '0.7em' }}>{p.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-muted fw-medium m-hide" onClick={() => navigate(`/patients/${p.id.replace('#', '')}`)}>{p.id}</td>
                                    <td className="m-hide" onClick={() => navigate(`/patients/${p.id.replace('#', '')}`)}>{p.age}</td>
                                    <td className="m-hide" onClick={() => navigate(`/patients/${p.id.replace('#', '')}`)}>{p.doctor}</td>
                                    <td className="m-hide" onClick={() => navigate(`/patients/${p.id.replace('#', '')}`)}>{p.date}</td>
                                    <td className="m-hide" onClick={() => navigate(`/patients/${p.id.replace('#', '')}`)}><span className={getStatusBadge(p.status)}>{p.status}</span></td>
                                    <td className="text-end pe-3">
                                        <div className="dropdown-hover-container d-inline-block">
                                            <button className="btn btn-light btn-sm rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', background: 'var(--bg-body)', color: 'var(--text-muted)' }}>
                                                <FontAwesomeIcon icon={faEllipsisH} />
                                            </button>
                                            <div className="dropdown-menu-custom text-start" style={{ width: '160px', top: '100%', right: '0' }}>
                                                <Link to={`/patients/${p.id.replace('#', '')}`} className="d-flex align-items-center px-3 py-2 text-decoration-none text-muted hover-bg-subtle rounded text-small transition-all">
                                                    <FontAwesomeIcon icon={faSearch} className="me-2 opacity-50" width="14" />
                                                    View Details
                                                </Link>
                                                <button
                                                    className="d-flex w-100 align-items-center px-3 py-2 border-0 bg-transparent text-muted hover-bg-subtle rounded text-small cursor-pointer transition-all"
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    <FontAwesomeIcon icon={faFilter} className="me-2 opacity-50" width="14" />
                                                    Edit Patient
                                                </button>
                                                <div className="border-top my-1" style={{ borderColor: 'var(--border-color)' }}></div>
                                                <button
                                                    className="d-flex w-100 align-items-center px-3 py-2 border-0 bg-transparent text-danger hover-bg-subtle rounded text-small cursor-pointer transition-all"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this patient?')) {
                                                            setPatients(patients.filter(pat => pat.id !== p.id));
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="me-2 opacity-50" width="14" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                < div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-muted small">Showing {filteredPatients.length} patients</span>
                    <div className="btn-group">
                        <button className="btn btn-sm btn-outline-secondary">Prev</button>
                        <button className="btn btn-sm btn-outline-secondary active">1</button>
                        <button className="btn btn-sm btn-outline-secondary">2</button>
                        <button className="btn btn-sm btn-outline-secondary">Next</button>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default Patients;
