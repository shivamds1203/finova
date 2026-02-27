import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, PieChart as PieIcon, Activity, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DownloadButton from '../components/documents/DownloadButton';

const PERFORMANCE_DATA = [
    { name: 'Mon', value: 45000 },
    { name: 'Tue', value: 47200 },
    { name: 'Wed', value: 46800 },
    { name: 'Thu', value: 50400 },
    { name: 'Fri', value: 52100 },
    { name: 'Sat', value: 51800 },
    { name: 'Sun', value: 54200 },
];

const ALLOCATION_DATA = [
    { name: 'Stocks', value: 65, color: '#3B82F6' },
    { name: 'Crypto', value: 20, color: '#F59E0B' },
    { name: 'Real Estate', value: 10, color: '#10B981' },
    { name: 'Cash', value: 5, color: '#6366F1' },
];

const ASSETS = [
    { name: 'Apple Inc.', symbol: 'AAPL', type: 'Stock', value: 12450.60, change: '+2.4%', trend: 'up' },
    { name: 'Nvidia', symbol: 'NVDA', type: 'Stock', value: 8900.20, change: '+5.7%', trend: 'up' },
    { name: 'Bitcoin', symbol: 'BTC', type: 'Crypto', value: 6200.00, change: '+1.2%', trend: 'up' },
    { name: 'Ethereum', symbol: 'ETH', type: 'Crypto', value: 3400.50, change: '-0.8%', trend: 'down' },
];

const Investments = () => {
    const navigate = useNavigate();

    const handleDownloadPDF = async () => {
        // Ensure we don't block the UI thread completely, giving the button time to spin
        await new Promise(resolve => setTimeout(resolve, 800));

        const doc = new jsPDF();

        // --- Branding / Header ---
        // Instead of slate-900 background, add the newly generated geometric image as full-bleed background
        const imgUrl = '/pdf-bg.png';
        const img = new Image();
        img.src = imgUrl;

        // Wait for image to load to guarantee it draws on the PDF canvas
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Add the image filling a standard A4 page (210 x 297 mm)
        doc.addImage(img, 'PNG', 0, 0, 210, 297);

        doc.setTextColor(15, 23, 42); // slate-900 (Dark color for light background)
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("Finova Intelligence", 14, 25);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`Investment Report \u2022 ${dateStr}`, 14, 32);

        // --- Summary Metric ---
        doc.setTextColor(15, 23, 42); // slate-900
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Portfolio Performance overview", 14, 55);

        doc.setFontSize(32);
        doc.text("$54,200.00", 14, 68);

        doc.setFontSize(12);
        doc.setTextColor(16, 185, 129); // emerald-500
        doc.text("+12.5% (This Week)", 75, 68);

        // --- Active Holdings Table ---
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(14);
        doc.text("Active Holdings Breakdown", 14, 85);

        const tableBody = ASSETS.map(asset => [
            `${asset.name} (${asset.symbol})`,
            asset.type,
            `$${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            asset.change
        ]);

        autoTable(doc, {
            startY: 90,
            head: [['Asset', 'Type', 'Current Value', '24h Change']],
            body: tableBody,
            theme: 'grid',
            headStyles: {
                fillColor: [15, 23, 42], // slate-900 
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'left'
            },
            columnStyles: {
                0: { fontStyle: 'bold' },
                2: { halign: 'right' },
                3: { halign: 'right' },
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252] // slate-50
            },
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 6,
            }
        });

        // --- Footer ---
        const pageCount = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text(`Finova Document Intelligence \u00A9 2026`, 14, 290);
            doc.text(`Page ${i} of ${pageCount}`, 196, 290, { align: 'right' });
        }

        doc.save("finova-investment-report.pdf");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-text-secondary hover:text-[var(--text-primary)] transition-colors mb-4 text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-black uppercase tracking-widest">PRO Active</span>
                        <span className="text-text-secondary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <Activity className="w-3 h-3" /> Live Market Data
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Investment Hub</h1>
                    <p className="text-text-secondary font-medium mt-1">Manage your portfolio with elite precision and real-time insights.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="flex bg-[var(--surface-muted)] p-1 rounded-2xl border-2 border-[var(--border)] shrink-0 h-[48px]">
                        <button className="px-6 h-full bg-[var(--text-primary)] rounded-xl shadow-premium text-sm font-bold text-[var(--background)] border-2 border-[var(--text-primary)]">Portfolio</button>
                        <button className="px-6 h-full text-sm font-bold text-text-secondary hover:text-[var(--text-primary)] transition-colors">Markets</button>
                        <button className="px-6 h-full text-sm font-bold text-text-secondary hover:text-[var(--text-primary)] transition-colors">Analysis</button>
                    </div>

                    <div className="shrink-0 h-[48px] flex items-stretch">
                        <DownloadButton onClick={handleDownloadPDF} label="Export PDF" />
                    </div>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card-premium p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-1">Portfolio Performance</div>
                            <div className="text-3xl font-black text-[var(--text-primary)]">$54,200.00</div>
                        </div>
                        <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                            <div className="text-emerald-600 font-bold flex items-center gap-1">
                                <TrendingUp className="w-5 h-5" /> +12.5%
                            </div>
                            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest text-center mt-0.5">This Week</div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={PERFORMANCE_DATA}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: '2px solid #0F172A',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-premium p-8 flex flex-col items-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-green-500/20 group-hover:ring-green-500/50 transition-all">
                        <PieIcon className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)]">Asset Allocation</h2>
                    <div className="h-[200px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ALLOCATION_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {ALLOCATION_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Total Assets</div>
                            <div className="text-xl font-black text-[var(--text-primary)]">4</div>
                        </div>
                    </div>
                    <div className="w-full mt-8 space-y-4">
                        {ALLOCATION_DATA.map(item => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-bold text-[var(--text-primary)]">{item.name}</span>
                                </div>
                                <span className="text-sm font-black text-[var(--text-primary)]">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Asset Table */}
            <div className="card-premium overflow-hidden">
                <div className="p-8 border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[var(--surface-muted)] rounded-xl border-2 border-[var(--border)] shadow-sm">
                            <Briefcase className="w-5 h-5 text-[var(--text-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Active Holdings</h3>
                    </div>
                    <button className="text-sm font-bold text-primary hover:underline">Customize View</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[var(--surface-muted)] text-[10px] uppercase tracking-widest font-black text-text-secondary border-b border-[var(--border-subtle)]">
                            <tr>
                                <th className="px-8 py-4">Asset</th>
                                <th className="px-8 py-4">Type</th>
                                <th className="px-8 py-4">Current Value</th>
                                <th className="px-8 py-4">24h Change</th>
                                <th className="px-8 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-subtle)]">
                            {ASSETS.map((asset, i) => (
                                <motion.tr
                                    key={asset.symbol}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="group hover:bg-[var(--surface-muted)] transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-[var(--surface-muted)] border-2 border-[var(--border-subtle)] rounded-xl font-black text-xs text-[var(--text-primary)] shadow-sm">
                                                {asset.symbol}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[var(--text-primary)]">{asset.name}</div>
                                                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{asset.symbol}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${asset.type === 'Stock' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                            {asset.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-[var(--text-primary)]">${asset.value.toLocaleString()}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`flex items-center gap-1 text-sm font-bold ${asset.trend === 'up' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                            {asset.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            {asset.change}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="px-4 py-2 bg-[var(--text-primary)] text-[var(--background)] rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                                            Details
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default Investments;
