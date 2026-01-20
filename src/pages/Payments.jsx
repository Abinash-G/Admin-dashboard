import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import transactions from '../data/transactions.json';

const Payments = () => {
    // Calculate stats
    const stats = useMemo(() => {
        const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        return transactions.reduce((acc, curr) => {
            const amount = parseFloat(curr.amount.replace(/[₹,]/g, '')) || 0;

            // Total Revenue (Completed)
            if (curr.status === 'Completed') {
                acc.revenue += amount;
            }

            // Pending Payments
            if (curr.status === 'Pending') {
                acc.pending += amount;
            }

            // Transactions Today
            if (curr.date === todayStr) {
                acc.todayCount += 1;
            }

            return acc;
        }, { revenue: 0, pending: 0, todayCount: 0 });
    }, []);

    const formatCurrency = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}C`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
        return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'badge bg-success bg-opacity-10 text-success border border-success border-opacity-25';
            case 'Pending': return 'badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25';
            case 'Failed': return 'badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
            default: return 'badge bg-secondary';
        }
    };

    return (
        <div className="animate-fade-in">
            <h4 className="fw-bold mb-4">Payments & Billing</h4>

            <div className="row mb-4">
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                    <div className="glass-panel p-4 text-white h-100" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                        <p className="mb-1 opacity-75">Total Revenue (Monthly)</p>
                        <h2 className="fw-bold mb-0">{formatCurrency(stats.revenue)}</h2>
                    </div>
                </div>
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                    <div className="glass-panel p-4 h-100">
                        <p className="text-muted mb-1">Pending Payments</p>
                        <h2 className="fw-bold mb-0 text-warning">{formatCurrency(stats.pending)}</h2>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="glass-panel p-4 h-100">
                        <p className="text-muted mb-1">Transactions Today</p>
                        <h2 className="fw-bold mb-0 text-success">{stats.todayCount}</h2>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold m-0">Recent Transactions</h5>
                    <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                        <FontAwesomeIcon icon={faDownload} className="me-2" />
                        Export
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-borderless align-middle" style={{ color: 'var(--text-main)' }}>
                        <thead className="border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                            <tr className="text-muted text-uppercase small">
                                <th scope="col" className="ps-3 m-hide">Invoice ID</th>
                                <th scope="col">Patient</th>
                                <th scope="col" className="m-hide">Date</th>
                                <th scope="col" className="m-hide">Payment Method</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td className="ps-3 py-3 fw-medium small text-primary-custom m-hide">{trx.id}</td>
                                    <td className="fw-bold small">
                                        {trx.patient}
                                        <div className="pc-hide text-muted extra-small">{trx.date}</div>
                                    </td>
                                    <td className="text-muted small m-hide">{trx.date}</td>
                                    <td className="small m-hide">{trx.method}</td>
                                    <td className="fw-bold">{trx.amount}</td>
                                    <td><span className={`${getStatusBadge(trx.status)} px-3 py-2 rounded-pill scale-75 origin-left`}>{trx.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;
