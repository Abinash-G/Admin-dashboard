import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faVideo, faPlus, faTimes, faUser, faUserMd, faCalendarAlt, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Calendar.css'; // Custom styles
import doctorsList from '../data/doctors.json';
import patientsList from '../data/patients.json';

const Appointments = () => {
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([
        { patient: 'Alice Freeman', doctor: 'Dr. Sarah Wilson', type: 'General Checkup', time: '09:00 AM', date: 'Oct 25', status: 'Confirmed', img: 'https://i.pravatar.cc/150?img=5', day: '25', month: 'OCT' },
        { patient: 'Robert Wolf', doctor: 'Dr. John Davies', type: 'Cardio Consult', time: '11:30 AM', date: 'Oct 25', status: 'Pending', img: 'https://i.pravatar.cc/150?img=3', day: '25', month: 'OCT' },
        { patient: 'Michael Smith', doctor: 'Dr. Emily Rose', type: 'Pediatric', time: '02:00 PM', date: 'Oct 25', status: 'Cancelled', img: 'https://i.pravatar.cc/150?img=7', day: '25', month: 'OCT' },
    ]);

    const [formData, setFormData] = useState({
        patientName: '',
        doctorName: '',
        type: 'General Checkup',
        time: '09:00 AM',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddAppointment = (e) => {
        e.preventDefault();
        const apptDate = new Date(formData.date);
        const selectedPatient = patientsList.find(p => p.name === formData.patientName);

        const newAppt = {
            patient: formData.patientName,
            doctor: formData.doctorName,
            type: formData.type,
            time: formData.time,
            date: apptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            day: apptDate.getDate().toString(),
            month: apptDate.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
            status: formData.status,
            img: selectedPatient?.img || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };

        setAppointments([newAppt, ...appointments]);
        setShowModal(false);
        setFormData({
            patientName: '',
            doctorName: '',
            type: 'General Checkup',
            time: '09:00 AM',
            date: new Date().toISOString().split('T')[0],
            status: 'Pending'
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Confirmed': return 'badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill border border-success border-opacity-25';
            case 'Pending': return 'badge bg-warning bg-opacity-10 text-warning px-3 py-1 rounded-pill border border-warning border-opacity-25';
            case 'Cancelled': return 'badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill border border-danger border-opacity-25';
            default: return 'badge bg-secondary';
        }
    };

    return (
        <div className="animate-fade-in pb-5">
            <h4 className="fw-bold mb-4">Appointments</h4>

            <div className="row g-4">
                {/* Schedule List */}
                <div className="col-12 col-xl-8">
                    <div className="glass-panel p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold m-0">Upcoming Schedule</h6>
                            <button className="btn btn-primary-custom shadow-sm btn-sm px-4 rounded-pill text-nowrap" onClick={() => setShowModal(true)}>
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                New Appointment
                            </button>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            {appointments.length > 0 ? (
                                appointments.map((appt, i) => (
                                    <div key={i} className="card border-0 shadow-sm p-3 appt-card" style={{ background: 'var(--bg-body)' }}>
                                        <div className="row align-items-center g-3">
                                            <div className="col-auto" style={{ width: '100px', minWidth: '100px' }}>
                                                <div className="d-flex flex-column align-items-center gap-2">
                                                    <div className="appt-date-box shadow-sm">
                                                        <span className="fw-bold fs-4 lh-1">{appt.day}</span>
                                                        <span className="small text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>{appt.month}</span>
                                                    </div>
                                                    <span className={`${getStatusBadge(appt.status)} w-100 text-center`} style={{ fontSize: '0.7rem' }}>{appt.status}</span>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="d-flex align-items-center gap-3">
                                                    <img src={appt.img} alt={appt.patient} className="rounded-circle d-none d-md-block" width="40" height="40" style={{ objectFit: 'cover' }} />
                                                    <div>
                                                        <h6 className="fw-bold m-0 mb-1">{appt.patient}</h6>
                                                        <p className="text-muted small m-0">{appt.type} with <span className="text-primary-custom fw-medium">{appt.doctor}</span></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-auto d-flex align-items-center gap-4 text-muted small justify-content-end text-nowrap">
                                                <div className="d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faClock} className="me-2 opacity-50" />
                                                    {appt.time}
                                                </div>
                                                <div className="d-flex align-items-center d-none d-sm-flex">
                                                    <FontAwesomeIcon icon={faVideo} className="me-2 opacity-50" />
                                                    Online
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <p className="text-muted">No appointments scheduled.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Calendar Side */}
                <div className="col-12 col-xl-4">
                    <div className="glass-panel p-4 h-100">
                        <h6 className="fw-bold mb-4">Calendar Navigation</h6>
                        <div className="d-flex justify-content-center mb-4">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="border-0 shadow-sm w-100 rounded-4 p-2"
                            />
                        </div>

                        <div className="mt-4 pt-4 border-top" style={{ borderColor: 'var(--border-color)' }}>
                            <h6 className="fw-bold small text-uppercase text-muted mb-3">Today's Summary</h6>
                            <div className="d-flex align-items-center justify-content-between mb-3 p-3 rounded-3" style={{ background: 'var(--bg-body)' }}>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-2 me-3" style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FontAwesomeIcon icon={faCalendarAlt} size="sm" />
                                    </div>
                                    <span className="text-muted small">Total Appointments</span>
                                </div>
                                <span className="fw-bold">8</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ background: 'var(--bg-body)' }}>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-warning bg-opacity-10 text-warning p-2 me-3" style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FontAwesomeIcon icon={faClock} size="sm" />
                                    </div>
                                    <span className="text-muted small">Pending Requests</span>
                                </div>
                                <span className="fw-bold text-warning">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Appointment Modal */}
            {showModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start justify-content-center px-3 pt-5" style={{ zIndex: 1050, backdropFilter: 'blur(4px)', overflowY: 'auto' }}>
                    <div className="glass-panel p-4 w-100 shadow-lg animate-fade-in my-4" style={{ maxWidth: '550px', backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                            <h5 className="fw-bold m-0 text-main">Schedule Appointment</h5>
                            <button className="btn btn-link p-0 text-decoration-none text-muted" onClick={() => setShowModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <form onSubmit={handleAddAppointment}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Select Patient</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-body border-end-0"><FontAwesomeIcon icon={faUser} className="text-muted opacity-50" /></span>
                                    <select required className="form-select border-start-0" name="patientName" value={formData.patientName} onChange={handleInputChange} style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>
                                        <option value="">Choose Patient...</option>
                                        {patientsList.map(p => <option key={p.id} value={p.name}>{p.name} ({p.id})</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Assigned Doctor</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-body border-end-0"><FontAwesomeIcon icon={faUserMd} className="text-muted opacity-50" /></span>
                                    <select required className="form-select border-start-0" name="doctorName" value={formData.doctorName} onChange={handleInputChange} style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>
                                        <option value="">Select Doctor...</option>
                                        {doctorsList.map(d => <option key={d.id} value={d.name}>{d.name} - {d.role}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Consultation Type</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body border-end-0"><FontAwesomeIcon icon={faStethoscope} className="text-muted opacity-50" /></span>
                                        <select className="form-select border-start-0" name="type" value={formData.type} onChange={handleInputChange} style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>
                                            <option value="General Checkup">General Checkup</option>
                                            <option value="Cardio Consult">Cardio Consult</option>
                                            <option value="Pediatric">Pediatric</option>
                                            <option value="Neurology">Neurology</option>
                                            <option value="Dermatology">Dermatology</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Time Slot</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body border-end-0"><FontAwesomeIcon icon={faClock} className="text-muted opacity-50" /></span>
                                        <input required type="text" className="form-control border-start-0" name="time" value={formData.time} onChange={handleInputChange} placeholder="e.g. 10:30 AM" style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Date</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body border-end-0"><FontAwesomeIcon icon={faCalendarAlt} className="text-muted opacity-50" /></span>
                                        <input required type="date" className="form-control border-start-0" name="date" value={formData.date} onChange={handleInputChange} style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-muted">Status</label>
                                    <select className="form-select" name="status" value={formData.status} onChange={handleInputChange} style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                                <button type="button" className="btn btn-light px-4 border" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary-custom px-4 rounded-pill">Book Appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
