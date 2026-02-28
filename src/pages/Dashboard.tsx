import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, Plus, Download, Sparkles } from 'lucide-react';
import OverviewCards from '../components/dashboard/OverviewCards';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import InvestmentPortfolio from '../components/dashboard/InvestmentPortfolio';
import AIInsights from '../components/dashboard/AIInsights';
import AddExpenseModal from '../components/dashboard/AddExpenseModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DownloadButton from '../components/documents/DownloadButton';
import HealthGauge from '../components/dashboard/HealthGauge';
import AIChat from '../components/dashboard/AIChat';
import { useFinancialHealth } from '../hooks/useFinancialHealth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../providers/CurrencyContext';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { formatCurrency } = useCurrency();

    // Mock Dynamic Data for Health Engine
    const financialData = {
        income: 12500,
        expenses: 4200,
        savings: 3800,
        debt: 1200,
        investmentGrowth: 12.5
    };

    const { score, status } = useFinancialHealth(financialData);

    const handleDownloadPDF = async () => {
        // Give button time to show interaction state
        await new Promise(resolve => setTimeout(resolve, 800));

        const doc = new jsPDF();

        // --- PAGE 1: COVER PAGE ---
        // Background White
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');

        // Top Left Black Triangle
        doc.setFillColor(23, 23, 23); // bg-neutral-900 (Black)
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
        doc.text("FINOVA", 195, 200, { align: 'right' });
        doc.text("DASHBOARD", 195, 218, { align: 'right' });

        // Subtitle
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("SMART FINANCIAL OVERVIEW", 195, 235, { align: 'right' });
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`REPORT \u2022 ${dateStr}`, 195, 243, { align: 'right' });

        // Bottom Footer in the black corner
        doc.setFontSize(8);
        doc.text("alex.sterling@finova.co", 15, 280);
        doc.text("finova.co/dashboard", 15, 285);

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
        doc.text(score.toString(), 37.5, 82, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("HEALTH SCORE", 37.5, 105, { align: 'center' });
        const statusDesc = doc.splitTextToSize("Score indicates strong proactive momentum.", 60);
        doc.text(statusDesc, 37.5, 115, { align: 'center' });

        // Circle 2
        doc.circle(37.5, 150, 15, 'S');
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("+12.5%", 37.5, 152, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("PORTFOLIO 7D", 37.5, 175, { align: 'center' });
        const portDesc = doc.splitTextToSize("Sustained growth across primary investment accounts.", 60);
        doc.text(portDesc, 37.5, 185, { align: 'center' });

        // Circle 3
        doc.circle(37.5, 220, 15, 'S');
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("-4.2%", 37.5, 222, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("EXPENSE 30D", 37.5, 245, { align: 'center' });
        const expDesc = doc.splitTextToSize("Expenses reduced within optimal margins this cycle.", 60);
        doc.text(expDesc, 37.5, 255, { align: 'center' });

        // Left sidebar footer
        doc.text(`Finova Intelligence \u00A9 2026`, 37.5, 285, { align: 'center' });

        // --- Right Content Column ---
        const rMargin = 90;
        doc.setTextColor(23, 23, 23); // neutral-900

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("FINOVA INTELLIGENCE", rMargin, 30);

        doc.setFontSize(28);
        doc.text("EXECUTIVE", rMargin, 50);
        doc.setFontSize(24);
        doc.setFont("helvetica", "normal");
        doc.text("SUMMARY", rMargin, 60);

        doc.setFontSize(9);
        doc.setTextColor(113, 113, 122); // zinc-500
        const introText = doc.splitTextToSize("This report provides a comprehensive overview of your financial health, monthly expenditures, and key performance indicators to help maintain strong financial momentum and proactive planning.", 100);
        doc.text(introText, rMargin, 75);

        // Content Table
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("FINANCIAL GOALS", rMargin, 110);
        doc.setLineWidth(0.5);
        doc.setDrawColor(23, 23, 23);
        doc.line(rMargin, 115, rMargin + 30, 115);

        const tableBody = [
            ['Total Balance', formatCurrency(54230.15), '+12.5%'],
            ['Monthly Expenses', formatCurrency(3240.50), '-4.2%'],
            ['Investments', formatCurrency(128400.00), '+8.3%'],
            ['Active Credit', formatCurrency(1240.00), '+0.5%'],
            ['Financial Health Score', `${score} (${status.label})`, '-']
        ];

        autoTable(doc, {
            startY: 125,
            margin: { left: rMargin, right: 20 },
            head: [['METRIC', 'CURRENT VALUE', 'TREND']],
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
                1: { halign: 'right', textColor: [82, 82, 91] },
                2: { halign: 'right', textColor: [168, 85, 247], fontStyle: 'bold' },
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

        doc.save("finova-dashboard-report.pdf");
    };

    return (
        <div className="space-y-10">
            <AIChat />
            <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-[var(--text-primary)] font-bold text-[10px] text-[var(--background)] uppercase tracking-widest">Premium</span>
                        <div className="flex items-center gap-1 text-text-secondary text-[11px] font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Ultra V3 Activated
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
                        Financial Overview
                    </h1>
                    <p className="text-text-secondary font-medium mt-1">Greetings, Alex. Your financial health is <span style={{ color: status.color }} className="font-bold">{status.label.toLowerCase()}</span> today.</p>
                </motion.div>

                <div className="flex bg-[var(--surface-muted)] p-1 rounded-2xl border-2 border-[var(--border)] shrink-0 h-[48px]">
                    <div className="h-full flex items-stretch">
                        <DownloadButton onClick={handleDownloadPDF} label="Export" />
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="px-6 h-full bg-[var(--text-primary)] rounded-xl shadow-premium text-sm font-bold text-[var(--background)] border-2 border-[var(--text-primary)] flex items-center gap-2 ml-1 hover:opacity-90 transition-opacity">
                        <Plus size={18} />
                        Add Expense
                    </button>
                </div>
            </div>

            {/* Overview Section with Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <OverviewCards />
                </div>
                <div>
                    <HealthGauge score={score} status={status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <ExpenseChart />
                </div>

                {/* AI Insights */}
                <div>
                    <AIInsights />
                </div>
            </div>

            {/* Investments */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3">
                    <InvestmentPortfolio />
                </div>
                <div onClick={() => navigate('/dashboard/investments')} className="bg-[var(--surface-muted)] rounded-[32px] p-8 flex flex-col justify-center overflow-hidden relative group cursor-pointer border-2 border-[var(--border)] shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="relative z-10">
                        <h3 className="text-[var(--text-primary)] font-black text-2xl mb-2 italic">Portfolio Active</h3>
                        <p className="text-text-secondary text-sm mb-6 font-medium leading-relaxed">View your deep portfolio analytics and real-time stock alerts.</p>
                        <button onClick={() => navigate('/dashboard/investments')} className="w-full bg-[var(--background)] text-[var(--text-primary)] border border-[var(--border)] py-4 rounded-2xl text-sm font-bold shadow-xl active:scale-95 transition-all">Go to Investments</button>
                    </div>
                    {/* Decorative background element with animation */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
