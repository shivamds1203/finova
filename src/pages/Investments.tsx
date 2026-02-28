import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, PieChart as PieIcon, Activity, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DownloadButton from '../components/documents/DownloadButton';
import { useCurrency } from '../providers/CurrencyContext';
import toast from 'react-hot-toast';

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
    const { formatCurrency } = useCurrency();

    const handleDownloadPDF = async () => {
        // Ensure we don't block the UI thread completely, giving the button time to spin
        await new Promise(resolve => setTimeout(resolve, 800));

        const doc = new jsPDF();

        // --- PAGE 1: COVER PAGE ---
        // Background White
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');

        // Top Left Black Triangle
        doc.setFillColor(23, 23, 23); // bg-neutral-900
        doc.triangle(0, 0, 110, 0, 0, 80, 'F');

        // Logo Top Left
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("FINOVA", 15, 20);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("INTELLIGENCE", 15, 26);

        // Huge Middle Diagonal Black Block
        doc.setFillColor(23, 23, 23);
        doc.triangle(0, 210, 210, 60, 210, 297, 'F');
        doc.rect(0, 210, 210, 87, 'F'); // Fill beneath triangle to bottom

        // Overlaid Bottom Giant Purple Block
        doc.setFillColor(168, 85, 247); // bg-purple-500
        doc.triangle(0, 297, 0, 190, 210, 40, 'F'); // Sweep up
        doc.triangle(0, 297, 210, 40, 210, 297, 'F'); // Fill right bottom

        // Overlaid Black Corner at Bottom Left
        doc.setFillColor(23, 23, 23);
        doc.triangle(0, 220, 60, 297, 0, 297, 'F');

        // Huge Title sitting on Purple Area
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(54);
        doc.setFont("helvetica", "bold");
        doc.text("INVESTMENT", 195, 200, { align: 'right' });
        doc.text("PORTFOLIO", 195, 218, { align: 'right' });

        // Subtitle
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("DEEP PROTOCOL ANALYTICS", 195, 235, { align: 'right' });
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`REPORT \u2022 ${dateStr}`, 195, 243, { align: 'right' });

        // Bottom Footer in the black corner
        doc.setFontSize(8);
        doc.text("alex.sterling@finova.co", 15, 280);
        doc.text("finova.co/investments", 15, 285);

        // --- PAGE 2: INNER LAYOUT (Left Purple Sidebar + Right Content) ---
        doc.addPage();

        // Background White
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');

        // Left Sidebar (1/3 width)
        doc.setFillColor(168, 85, 247); // purple-500
        doc.rect(0, 0, 75, 297, 'F');

        // Black corner top left on sidebar
        doc.setFillColor(23, 23, 23);
        doc.rect(0, 0, 75, 5, 'F');

        // Draw KPIs in the purple sidebar with circular highlights
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("METRICS", 37.5, 40, { align: 'center' });
        doc.setLineWidth(0.5);
        doc.setDrawColor(255, 255, 255);
        doc.line(15, 45, 60, 45); // underline

        // Circle 1
        doc.setLineWidth(1.5);
        doc.circle(37.5, 80, 15, 'S');
        doc.setFontSize(16);
        doc.text(formatCurrency(54200).replace(/\.00$/, ''), 37.5, 82, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("TOTAL VALUE", 37.5, 105, { align: 'center' });
        const valDesc = doc.splitTextToSize("Portfolio value includes 4 active asset classes.", 60);
        doc.text(valDesc, 37.5, 115, { align: 'center' });

        // Circle 2
        doc.circle(37.5, 150, 15, 'S');
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("+12.5%", 37.5, 152, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("GROWTH 7D", 37.5, 175, { align: 'center' });
        const portDesc = doc.splitTextToSize("Sustained growth primarily driven by tech stocks.", 60);
        doc.text(portDesc, 37.5, 185, { align: 'center' });

        // Left sidebar footer
        doc.text(`Finova Intelligence \u00A9 2026`, 37.5, 285, { align: 'center' });

        // --- Right Content Column ---
        const rMargin = 90;
        doc.setTextColor(23, 23, 23); // neutral-900

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("FINOVA INTELLIGENCE", rMargin, 30);

        doc.setFontSize(28);
        doc.text("ACTIVE", rMargin, 50);
        doc.setFontSize(24);
        doc.setFont("helvetica", "normal");
        doc.text("HOLDINGS", rMargin, 60);

        doc.setFontSize(9);
        doc.setTextColor(113, 113, 122); // zinc-500
        const introText = doc.splitTextToSize("Detailed breakdown of your current investment portfolio, showing asset allocation, current valuation, and 24-hour market trend movements.", 100);
        doc.text(introText, rMargin, 75);

        // Content Table
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("ASSET PERFORMANCE", rMargin, 110);
        doc.setLineWidth(0.5);
        doc.setDrawColor(23, 23, 23);
        doc.line(rMargin, 115, rMargin + 30, 115);

        const tableBody = ASSETS.map(asset => [
            `${asset.name} (${asset.symbol})`,
            asset.type,
            formatCurrency(asset.value),
            asset.change
        ]);

        autoTable(doc, {
            startY: 125,
            margin: { left: rMargin, right: 20 },
            head: [['ASSET', 'TYPE', 'VALUE', '24H']],
            body: tableBody,
            theme: 'plain',
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [168, 85, 247], // purple heading
                fontStyle: 'bold',
                lineColor: [228, 228, 231], // zinc-200 bottom border
                lineWidth: { bottom: 0.5 },
            },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: [23, 23, 23] },
                1: { textColor: [113, 113, 122] },
                2: { halign: 'right', textColor: [82, 82, 91] },
                3: { halign: 'right', textColor: [168, 85, 247], fontStyle: 'bold' },
            },
            alternateRowStyles: {
                fillColor: [250, 250, 250] // very light gray
            },
            styles: {
                font: 'helvetica',
                fontSize: 9,
                cellPadding: 6,
            }
        });

        // Top right page number
        doc.setFontSize(8);
        doc.setTextColor(161, 161, 170); // zinc-400
        doc.setFont("helvetica", "normal");
        doc.text(`Page 2`, 195, 20, { align: 'right' });

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
                        onClick={() => navigate('/dashboard')}
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
                        <button onClick={() => toast('Portfolio view is active')} className="px-6 h-full bg-[var(--text-primary)] rounded-xl shadow-premium text-sm font-bold text-[var(--background)] border-2 border-[var(--text-primary)]">Portfolio</button>
                        <button onClick={() => toast('Markets view coming soon')} className="px-6 h-full text-sm font-bold text-text-secondary hover:text-[var(--text-primary)] transition-colors">Markets</button>
                        <button onClick={() => toast('Analysis view coming soon')} className="px-6 h-full text-sm font-bold text-text-secondary hover:text-[var(--text-primary)] transition-colors">Analysis</button>
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
                            <div className="text-3xl font-black text-[var(--text-primary)]">{formatCurrency(54200.00)}</div>
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
                    <button onClick={() => toast('Customization options coming soon')} className="text-sm font-bold text-primary hover:underline">Customize View</button>
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
                                        <div className="text-sm font-black text-[var(--text-primary)]">{formatCurrency(asset.value)}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`flex items-center gap-1 text-sm font-bold ${asset.trend === 'up' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                            {asset.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            {asset.change}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button onClick={() => toast(`${asset.name} details coming soon`)} className="px-4 py-2 bg-[var(--text-primary)] text-[var(--background)] rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
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
