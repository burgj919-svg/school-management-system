import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from '../Header/Header'

export default function App(){
    const [query, setQuery] = useState("");
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/salaries/all', { withCredentials: true })
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
                setSalaries(data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const filteredItems = query
        ? salaries.filter((s) =>
            (s.teacherName || '').toLowerCase().includes(query.toLowerCase()) ||
            (s.teacherId || '').toLowerCase().includes(query.toLowerCase())
          )
        : salaries;

    return (
        <div>
            <Head />
            <div className="App max-w-6xl mx-auto px-4 py-8">
                <label className="text-sm font-bold text-slate-600 block mb-2">Search by Teacher Name or ID</label>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                    className="w-full max-w-md p-3 border border-slate-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {loading ? (
                    <p className="text-slate-500">Loading...</p>
                ) : filteredItems.length === 0 ? (
                    <p className="text-slate-500">No salary records found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="p-3 text-left font-semibold text-slate-600">Teacher</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">ID</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Subject</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Grade</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Month</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Salary</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((s, i) => (
                                    <tr key={s._id || i} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-3 font-medium">{s.teacherName}</td>
                                        <td className="p-3 text-slate-500">{s.teacherId}</td>
                                        <td className="p-3">{s.subjectName}</td>
                                        <td className="p-3">{s.grade}</td>
                                        <td className="p-3">{s.payMonth}</td>
                                        <td className="p-3">{s.monthlySalary}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                s.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                                s.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>{s.paymentStatus}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}



