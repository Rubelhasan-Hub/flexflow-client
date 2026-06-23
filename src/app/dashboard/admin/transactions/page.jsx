"use client";
import React, { useEffect, useState } from 'react';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments`)
            .then(res => res.json())
            .then(data => {
                setTransactions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching transactions:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 bg-[#0a0f1d] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6">Payment Transactions</h2>

            {loading ? (
                <div className="text-neutral-500">Loading transactions...</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#0f172a]">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-neutral-900 text-neutral-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">User Email</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-neutral-900/50 transition">
                                        <td className="p-4 text-sm">{tx.userEmail}</td>
                                        <td className="p-4 text-sm font-semibold text-green-400">${tx.amount}</td>
                                        <td className="p-4 text-sm text-neutral-400">
                                            {new Date(tx.bookedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-xs font-mono text-neutral-500">
                                            {tx.transactionId}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-neutral-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}