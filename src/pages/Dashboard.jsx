import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faProcedures,
    faUserMd,
    faDollarSign,
    faArrowUp,
    faUsers,
    faEllipsisH,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import transactions from '../data/transactions.json';

const StatCard = ({ icon, label, value, trend, color }) => (
    <div className="col-12 col-md-6 col-xl-3 mb-4">
        <div className="glass-panel p-4 h-100 card-hoverable position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start">
                <div className="overflow-hidden me-2">
                    <p className="text-muted mb-1 fw-medium text-truncate">{label}</p>
                    <h3 className="fw-bold mb-0 text-truncate" title={value?.toString()}>{value}</h3>
                </div>
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-md"
                    style={{ width: '48px', height: '48px', minWidth: '48px', flexShrink: 0, background: `linear-gradient(135deg, ${color}, #8b5cf6)` }}
                >
                    <FontAwesomeIcon icon={icon} />
                </div>
            </div>
            <div className="mt-4 d-flex align-items-center small">
                <span className="text-success fw-bold d-flex align-items-center">
                    <FontAwesomeIcon icon={faArrowUp} className="me-1" />
                    {trend}
                </span>
                <span className="text-muted ms-2">vs last month</span>
            </div>
        </div>
    </div>
);

const PatientTable = () => {
    const patients = [
        { id: '#P-001', name: 'Alice Freeman', age: 28, issue: 'Migraine', status: 'Outpatient', doctor: 'Dr. Sarah', img: 'https://i.pravatar.cc/150?img=5' },
        { id: '#P-002', name: 'Robert Wolf', age: 45, issue: 'Fracture', status: 'Admitted', doctor: 'Dr. John', img: 'https://i.pravatar.cc/150?img=3' },
        { id: '#P-003', name: 'Michael Smith', age: 32, issue: 'Fever', status: 'Outpatient', doctor: 'Dr. Sarah', img: 'https://i.pravatar.cc/150?img=7' },
        { id: '#P-004', name: 'Emma Watson', age: 24, issue: 'Checkup', status: 'Admitted', doctor: 'Dr. Mike', img: 'https://i.pravatar.cc/150?img=9' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Admitted': return 'badge bg-warning text-dark';
            case 'Outpatient': return 'badge bg-success';
            default: return 'badge bg-secondary';
        }
    };

    return (
        <div className="glass-panel p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0">Recent Patients</h5>
                <Link to="/patients" className="btn btn-sm btn-outline-secondary rounded-pill px-3 text-decoration-none">View All</Link>
            </div>
            <div className="table-responsive no-scrollbar">
                <table className="table table-borderless align-middle" style={{ color: 'var(--text-main)' }}>
                    <thead className="border-bottom d-none d-md-table-header-group" style={{ borderColor: 'var(--border-color)' }}>
                        <tr className="text-muted text-uppercase small">
                            <th scope="col" className="ps-0">Patient</th>
                            <th scope="col" className="m-hide">ID</th>
                            <th scope="col" className="m-hide">Diagnosis</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="m-hide">Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((p, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td className="ps-0 py-3">
                                    <div className="d-flex align-items-center overflow-hidden">
                                        <img src={p.img} alt={p.name} className="rounded-circle me-3 flex-shrink-0" width="32" height="32" />
                                        <div className="overflow-hidden">
                                            <Link to="/patients/1" className="m-0 fw-bold small text-decoration-none text-truncate d-block" style={{ color: 'var(--text-main)' }}>{p.name}</Link>
                                            <div className="pc-hide text-muted extra-small text-truncate">{p.issue}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-muted small m-hide">{p.id}</td>
                                <td className="small m-hide">{p.issue}</td>
                                <td><span className={`${getStatusBadge(p.status)} small`}>{p.status}</span></td>
                                <td className="small m-hide">{p.doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

const Dashboard = () => {
    const [timeFilter, setTimeFilter] = useState('This Week');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const revenue = useMemo(() => {
        const today = new Date("2025-12-23");
        let filtered = transactions.filter(trx => trx.status === 'Completed');

        if (timeFilter === 'This Week') {
            const start = new Date(today); start.setDate(today.getDate() - today.getDay());
            const end = new Date(start); end.setDate(start.getDate() + 6);
            filtered = filtered.filter(t => { const d = new Date(t.date); return d >= start && d <= end; });
        } else if (timeFilter === 'Last Week') {
            const start = new Date(today); start.setDate(today.getDate() - today.getDay() - 7);
            const end = new Date(start); end.setDate(start.getDate() + 6);
            filtered = filtered.filter(t => { const d = new Date(t.date); return d >= start && d <= end; });
        } else if (timeFilter === 'This Month') {
            filtered = filtered.filter(t => { const d = new Date(t.date); return d.getMonth() === today.getMonth(); });
        }

        return filtered.reduce((acc, curr) => {
            const amount = parseFloat(curr.amount.toString().replace(/[₹,]/g, '')) || 0;
            return acc + amount;
        }, 0);
    }, [transactions, timeFilter]);

    const formatCurrency = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lakh`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(2)}k`;
        return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    // Graph Data

    const revenueData = useMemo(() => {
        const today = new Date("2025-12-23");

        let filteredTrx = transactions.filter(trx => trx.status === 'Completed');

        if (timeFilter === 'This Week') {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            filteredTrx = filteredTrx.filter(trx => {
                const d = new Date(trx.date);
                return d >= startOfWeek && d <= endOfWeek;
            });
        } else if (timeFilter === 'Last Week') {
            const startOfLastWeek = new Date(today);
            startOfLastWeek.setDate(today.getDate() - today.getDay() - 7);
            const endOfLastWeek = new Date(startOfLastWeek);
            endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);

            filteredTrx = filteredTrx.filter(trx => {
                const d = new Date(trx.date);
                return d >= startOfLastWeek && d <= endOfLastWeek;
            });
        } else if (timeFilter === 'This Month') {
            filteredTrx = filteredTrx.filter(trx => {
                const d = new Date(trx.date);
                return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
            });
        }

        if (timeFilter === 'This Month') {
            const weeks = { 'W1': { i: 0, e: 0 }, 'W2': { i: 0, e: 0 }, 'W3': { i: 0, e: 0 }, 'W4': { i: 0, e: 0 }, 'W5': { i: 0, e: 0 } };
            filteredTrx.forEach(trx => {
                const d = new Date(trx.date);
                const day = d.getDate();
                const weekKey = day <= 7 ? 'W1' : day <= 14 ? 'W2' : day <= 21 ? 'W3' : day <= 28 ? 'W4' : 'W5';
                const amount = parseFloat(trx.amount.toString().replace(/[₹,]/g, '')) || 0;
                weeks[weekKey].i += amount;
                weeks[weekKey].e += Math.floor(amount * 0.4 + 500);
            });
            return Object.keys(weeks).map(w => ({ name: w, income: weeks[w].i, expense: weeks[w].e }));
        } else {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const chartOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const daysData = { 'Mon': { i: 0, e: 0 }, 'Tue': { i: 0, e: 0 }, 'Wed': { i: 0, e: 0 }, 'Thu': { i: 0, e: 0 }, 'Fri': { i: 0, e: 0 }, 'Sat': { i: 0, e: 0 }, 'Sun': { i: 0, e: 0 } };

            filteredTrx.forEach(trx => {
                const d = new Date(trx.date);
                const dayName = dayNames[d.getDay()];
                const amount = parseFloat(trx.amount.toString().replace(/[₹,]/g, '')) || 0;
                if (daysData[dayName]) {
                    daysData[dayName].i += amount;
                    daysData[dayName].e += Math.floor(amount * 0.4 + 500);
                }
            });
            return chartOrder.map(d => ({ name: d, income: daysData[d].i, expense: daysData[d].e }));
        }
    }, [transactions, timeFilter]);

    const patientTypeData = [
        { name: 'Child', value: 400 },
        { name: 'Adult', value: 300 },
        { name: 'Elderly', value: 300 },
    ];

    const COLORS = ['#0ea5e9', '#6366f1', '#a78bfa'];

    return (
        <div className="animate-fade-in">
            <style>
                {`
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
            {/* Stats Row */}
            <div className="row">
                <StatCard icon={faProcedures} label="Total Patients" value="1,240" trend="12.5%" color="#0ea5e9" />
                <StatCard icon={faUserMd} label="Doctors" value="24" trend="--%" color="#8b5cf6" />
                <StatCard icon={faUsers} label="Appointments" value="86" trend="5.2%" color="#ec4899" />
                <StatCard icon={faDollarSign} label="Earnings" value={formatCurrency(revenue)} trend="8.4%" color="#10b981" />
            </div>

            {/* Analytics Charts Row */}
            <div className="row mb-4">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <div className="glass-panel p-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold m-0">Revenue Analytics</h5>
                            <div className="position-relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="btn btn-sm d-flex align-items-center gap-2 border-0 fw-bold"
                                    style={{ color: 'var(--text-main)', background: 'transparent' }}
                                >
                                    {timeFilter}
                                    <FontAwesomeIcon icon={faChevronDown} size="xs" />
                                </button>
                                {showDropdown && (
                                    <div
                                        className="position-absolute end-0 top-100 mt-2 p-2 rounded shadow-lg animate-fade-in d-flex flex-column gap-2"
                                        style={{ backgroundColor: 'var(--bg-panel)', minWidth: '160px', zIndex: 1000, border: '1px solid var(--border-color)' }}
                                    >
                                        {['This Week', 'Last Week', 'This Month'].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => { setTimeFilter(opt); setShowDropdown(false); }}
                                                className="btn btn-sm w-100 text-start rounded"
                                                style={{
                                                    backgroundColor: timeFilter === opt ? 'var(--primary)' : 'transparent',
                                                    color: timeFilter === opt ? '#fff' : 'var(--text-main)',
                                                    border: 'none'
                                                }}
                                                onMouseEnter={(e) => { if (timeFilter !== opt) e.target.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)' }}
                                                onMouseLeave={(e) => { if (timeFilter !== opt) e.target.style.backgroundColor = 'transparent' }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '300px' }}>
                            <ResponsiveContainer>
                                <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-panel)', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: 'var(--text-main)' }}
                                    />
                                    <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                    <Area type="monotone" dataKey="expense" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-4">
                    <div className="glass-panel p-4 h-100 d-flex flex-column">
                        <h5 className="fw-bold mb-4">Patient Overview</h5>

                        {/* Chart Area */}
                        <div className="flex-grow-1 position-relative" style={{ minHeight: '200px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={patientTypeData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        cx="50%"
                                        cy="48%"
                                        stroke="none"
                                    >
                                        {patientTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-panel)', borderRadius: '8px', border: 'none' }}
                                        itemStyle={{ color: 'var(--text-main)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Centered Stats */}
                            <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ pointerEvents: 'none' }}>
                                <h4 className="fw-bold m-0" style={{ color: 'var(--text-main)' }}>1,240</h4>
                                <small style={{ color: 'var(--text-muted)' }}>Total</small>
                            </div>
                        </div>

                        {/* Custom Legend */}
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            {patientTypeData.map((entry, index) => (
                                <div key={index} className="d-flex align-items-center">
                                    <span
                                        className="d-inline-block rounded-circle me-2"
                                        style={{ width: '10px', height: '10px', backgroundColor: COLORS[index % COLORS.length] }}
                                    ></span>
                                    <small className="text-muted">{entry.name}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <PatientTable />
                </div>
                <div className="col-12 col-xl-4">
                    {/* Simple Timeline / Activity Feed */}
                    <div className="glass-panel p-4 h-100">
                        <h5 className="fw-bold mb-4">Upcoming Schedule</h5>
                        <div className="d-flex flex-column gap-3">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="d-flex align-items-start pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                                    <div className="text-center me-3" style={{ minWidth: '50px' }}>
                                        <span className="d-block text-muted small text-uppercase">Oct</span>
                                        <span className="d-block fw-bold fs-5">2{i}</span>
                                    </div>
                                    <div>
                                        <h6 className="fw-bold m-0">Heart Surgery</h6>
                                        <p className="text-muted small m-0">Dr. Sarah - OR 3</p>
                                        <p className="text-primary-custom extra-small fw-bold mt-1">09:00 AM - 11:30 AM</p>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-light w-100 mt-auto fw-medium text-primary-custom" style={{ background: 'var(--bg-body)' }}>
                                View Full Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
