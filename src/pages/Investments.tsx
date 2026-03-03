import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, PieChart as PieIcon, Activity, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DownloadButton from '../components/documents/DownloadButton';
import { useCurrency, CurrencyCode } from '../providers/CurrencyContext';
import toast from 'react-hot-toast';

const PDF_CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
    { code: 'JPY', label: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', label: 'Canadian Dollar', symbol: 'CA$' },
];

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
    USD: 1.0, INR: 83.25, EUR: 0.92, GBP: 0.79, JPY: 150.40, CAD: 1.35,
};

function buildFormatter(code: CurrencyCode) {
    const locales: Record<CurrencyCode, string> = {
        USD: 'en-US', INR: 'en-IN', EUR: 'de-DE',
        GBP: 'en-GB', JPY: 'ja-JP', CAD: 'en-CA',
    };
    return (amount: number) =>
        new Intl.NumberFormat(locales[code], {
            style: 'currency',
            currency: code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount * EXCHANGE_RATES[code]);
}

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
        await new Promise(resolve => setTimeout(resolve, 800));
        const doc = new jsPDF();

        // ─── Helper: draw the standard left purple sidebar ───────────────────
        const drawSidebar = (pageLabel: string) => {
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, 210, 297, 'F');
            doc.setFillColor(168, 85, 247);
            doc.rect(0, 0, 75, 297, 'F');
            doc.setFillColor(23, 23, 23);
            doc.rect(0, 0, 75, 5, 'F');
            // sidebar footer
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");
            doc.text("Finova Intelligence \u00A9 2026", 37.5, 290, { align: 'center' });
            // page number
            doc.setTextColor(161, 161, 170);
            doc.setFontSize(8);
            doc.text(pageLabel, 195, 20, { align: 'right' });
        };

        // ─── Helper: sidebar KPI circle ───────────────────────────────────────
        const drawCircleKPI = (value: string, label: string, desc: string, cy: number) => {
            doc.setDrawColor(255, 255, 255);
            doc.setLineWidth(1.5);
            doc.circle(37.5, cy, 15, 'S');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(value, 37.5, cy + 2, { align: 'center' });
            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");
            doc.text(label, 37.5, cy + 22, { align: 'center' });
            const d = doc.splitTextToSize(desc, 60);
            doc.text(d, 37.5, cy + 29, { align: 'center' });
        };

        // ─── Helper: sidebar header ───────────────────────────────────────────
        const drawSidebarHeader = (title: string) => {
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text(title, 37.5, 32, { align: 'center' });
            doc.setLineWidth(0.5);
            doc.setDrawColor(255, 255, 255);
            doc.line(15, 37, 60, 37);
        };

        // ─── Helper: right-column page title ─────────────────────────────────
        const drawRightTitle = (line1: string, line2: string, subtitle: string) => {
            const rM = 90;
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(168, 85, 247);
            doc.text("FINOVA INTELLIGENCE", rM, 25);
            doc.setFontSize(26);
            doc.setTextColor(23, 23, 23);
            doc.text(line1, rM, 45);
            doc.setFontSize(22);
            doc.setFont("helvetica", "normal");
            doc.text(line2, rM, 55);
            doc.setFontSize(8);
            doc.setTextColor(113, 113, 122);
            const s = doc.splitTextToSize(subtitle, 100);
            doc.text(s, rM, 68);
            doc.setDrawColor(23, 23, 23);
            doc.setLineWidth(0.5);
            doc.line(rM, 58, rM + 28, 58);
        };

        // ════════════════════════════════════════════════════════════════════
        // PAGE 1 — COVER
        // ════════════════════════════════════════════════════════════════════
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');
        doc.setFillColor(23, 23, 23);
        doc.triangle(0, 0, 110, 0, 0, 80, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("FINOVA", 15, 20);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("INTELLIGENCE", 15, 26);
        doc.setFillColor(23, 23, 23);
        doc.triangle(0, 210, 210, 60, 210, 297, 'F');
        doc.rect(0, 210, 210, 87, 'F');
        doc.setFillColor(168, 85, 247);
        doc.triangle(0, 297, 0, 190, 210, 40, 'F');
        doc.triangle(0, 297, 210, 40, 210, 297, 'F');
        doc.setFillColor(23, 23, 23);
        doc.triangle(0, 220, 60, 297, 0, 297, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(54);
        doc.setFont("helvetica", "bold");
        doc.text("INVESTMENT", 195, 200, { align: 'right' });
        doc.text("PORTFOLIO", 195, 218, { align: 'right' });
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("DEEP PROTOCOL ANALYTICS", 195, 235, { align: 'right' });
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`REPORT \u2022 ${dateStr}`, 195, 243, { align: 'right' });
        doc.setFontSize(8);
        doc.text("alex.sterling@finova.co", 15, 280);
        doc.text("finova.co/investments", 15, 285);

        // ════════════════════════════════════════════════════════════════════
        // PAGE 2 — ACTIVE HOLDINGS TABLE
        // ════════════════════════════════════════════════════════════════════
        doc.addPage();
        drawSidebar("Page 2 of 6");
        drawSidebarHeader("METRICS");
        drawCircleKPI(formatCurrency(54200).replace(/\.00$/, ''), "TOTAL VALUE", "Portfolio spans 4 active asset classes.", 75);
        drawCircleKPI("+12.5%", "GROWTH 7D", "Driven primarily by tech stocks.", 160);

        drawRightTitle("ACTIVE", "HOLDINGS", "Current investment positions with valuation and 24-hour trend movements.");

        const rM = 90;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("ASSET PERFORMANCE", rM, 90);
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, 94, rM + 28, 94);

        autoTable(doc, {
            startY: 100,
            margin: { left: rM, right: 15 },
            head: [['ASSET', 'TYPE', 'VALUE (USD)', '24H']],
            body: ASSETS.map(a => [`${a.name} (${a.symbol})`, a.type, formatCurrency(a.value), a.change]),
            theme: 'plain',
            headStyles: { fillColor: [255, 255, 255], textColor: [168, 85, 247], fontStyle: 'bold', lineColor: [228, 228, 231], lineWidth: { bottom: 0.5 } },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: [23, 23, 23] },
                1: { textColor: [113, 113, 122] },
                2: { halign: 'right', textColor: [82, 82, 91] },
                3: { halign: 'right', textColor: [168, 85, 247], fontStyle: 'bold' },
            },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            styles: { font: 'helvetica', fontSize: 9, cellPadding: 6 },
        });

        // ════════════════════════════════════════════════════════════════════
        // PAGE 3 — CURRENCY REFERENCE
        // ════════════════════════════════════════════════════════════════════
        doc.addPage();
        drawSidebar("Page 3 of 7");
        drawSidebarHeader("CURRENCIES");
        drawCircleKPI("6", "CURRENCIES", "All major currencies supported by Finova.", 80);
        drawCircleKPI("USD", "BASE RATE", "All values are converted from USD base.", 170);

        drawRightTitle("CURRENCY", "REFERENCE", "Portfolio totals converted to all supported currencies using live exchange rates.");

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("TOTAL PORTFOLIO IN ALL CURRENCIES", rM, 90);
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, 94, rM + 28, 94);

        // Build rows: currency, symbol, rate, converted total
        const portfolioUSD = 54200;
        const currencyRows = PDF_CURRENCIES.map(c => [
            c.code,
            c.label,
            c.symbol,
            `1 USD = ${EXCHANGE_RATES[c.code]} ${c.code}`,
            buildFormatter(c.code)(portfolioUSD),
        ]);

        autoTable(doc, {
            startY: 100,
            margin: { left: rM, right: 15 },
            head: [['CODE', 'CURRENCY', 'SYMBOL', 'RATE', 'PORTFOLIO VALUE']],
            body: currencyRows,
            theme: 'plain',
            headStyles: { fillColor: [255, 255, 255], textColor: [168, 85, 247], fontStyle: 'bold', lineColor: [228, 228, 231], lineWidth: { bottom: 0.5 } },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: [23, 23, 23], cellWidth: 12 },
                1: { textColor: [82, 82, 91], cellWidth: 30 },
                2: { halign: 'center', textColor: [113, 113, 122], cellWidth: 14 },
                3: { textColor: [113, 113, 122], cellWidth: 36 },
                4: { halign: 'right', textColor: [168, 85, 247], fontStyle: 'bold' },
            },
            alternateRowStyles: { fillColor: [245, 243, 255] },
            styles: { font: 'helvetica', fontSize: 9, cellPadding: 6 },
        });

        // Per-asset breakdown for each currency
        const assetBreakY = 205;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("PER-ASSET VALUE IN ALL CURRENCIES", rM, assetBreakY);
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, assetBreakY + 4, rM + 28, assetBreakY + 4);

        const assetHead = ['ASSET', ...PDF_CURRENCIES.map(c => c.code)];
        const assetBody = ASSETS.map(a => [
            `${a.name}`,
            ...PDF_CURRENCIES.map(c => {
                const fmt = buildFormatter(c.code);
                return fmt(a.value);
            }),
        ]);

        autoTable(doc, {
            startY: assetBreakY + 8,
            margin: { left: rM, right: 15 },
            head: [assetHead],
            body: assetBody,
            theme: 'plain',
            headStyles: { fillColor: [23, 23, 23], textColor: [255, 255, 255], fontStyle: 'bold' },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: [23, 23, 23], cellWidth: 22 },
                1: { halign: 'right', textColor: [82, 82, 91], cellWidth: 14 },
                2: { halign: 'right', textColor: [82, 82, 91], cellWidth: 18 },
                3: { halign: 'right', textColor: [82, 82, 91], cellWidth: 12 },
                4: { halign: 'right', textColor: [82, 82, 91], cellWidth: 12 },
                5: { halign: 'right', textColor: [82, 82, 91], cellWidth: 14 },
                6: { halign: 'right', textColor: [82, 82, 91], cellWidth: 16 },
            },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            styles: { font: 'helvetica', fontSize: 7, cellPadding: 4 },
        });

        // Note at bottom
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(113, 113, 122);
        doc.text("* Exchange rates are indicative and based on Finova's live rate feed. Values are for reference only.", rM, 285);

        // ════════════════════════════════════════════════════════════════════
        // PAGE 4 — WEEKLY PERFORMANCE
        // ════════════════════════════════════════════════════════════════════
        doc.addPage();
        drawSidebar("Page 4 of 7");
        drawSidebarHeader("GROWTH");
        drawCircleKPI("+20.2%", "MTD RETURN", "Month-to-date gains across all classes.", 75);
        drawCircleKPI("54.2K", "PEAK VALUE", "Highest portfolio value recorded this week.", 160);

        drawRightTitle("WEEKLY", "PERFORMANCE", "Seven-day portfolio value trajectory plotted across trading sessions.");

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("7-DAY VALUE CHART", rM, 90);
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, 94, rM + 28, 94);

        // Draw the bar chart manually
        const perfData = [
            { name: 'Mon', value: 45000 }, { name: 'Tue', value: 47200 },
            { name: 'Wed', value: 46800 }, { name: 'Thu', value: 50400 },
            { name: 'Fri', value: 52100 }, { name: 'Sat', value: 51800 },
            { name: 'Sun', value: 54200 },
        ];
        const chartX = rM;
        const chartW = 110;
        const chartH = 70;
        const chartY = 170;
        const minV = 44000, maxV = 55000;
        const barW = chartW / perfData.length - 3;

        // Grid lines
        doc.setDrawColor(228, 228, 231);
        doc.setLineWidth(0.3);
        for (let i = 0; i <= 4; i++) {
            const gy = chartY - (i / 4) * chartH;
            doc.line(chartX, gy, chartX + chartW, gy);
            const label = `${Math.round((minV + (i / 4) * (maxV - minV)) / 1000)}K`;
            doc.setFontSize(6);
            doc.setTextColor(161, 161, 170);
            doc.text(label, chartX - 3, gy + 1.5, { align: 'right' });
        }

        // Bars
        perfData.forEach((d, i) => {
            const bh = ((d.value - minV) / (maxV - minV)) * chartH;
            const bx = chartX + i * (barW + 3);
            const by = chartY - bh;
            // shadow bar
            doc.setFillColor(228, 228, 231);
            doc.rect(bx + 1, chartY - chartH, barW, chartH, 'F');
            // actual bar
            doc.setFillColor(168, 85, 247);
            doc.rect(bx, by, barW, bh, 'F');
            // label
            doc.setFontSize(6.5);
            doc.setTextColor(113, 113, 122);
            doc.text(d.name, bx + barW / 2, chartY + 6, { align: 'center' });
            // value label on top
            doc.setFontSize(5.5);
            doc.setTextColor(23, 23, 23);
            doc.text(`${(d.value / 1000).toFixed(1)}K`, bx + barW / 2, by - 2, { align: 'center' });
        });

        // Summary row beneath chart
        const summaryY = chartY + 22;
        const cols = [
            { label: 'OPENING', value: '$45,000' },
            { label: 'CLOSING', value: '$54,200' },
            { label: 'PEAK', value: '$54,200' },
            { label: 'VOLUME', value: '7 Sessions' },
        ];
        cols.forEach((c, i) => {
            const cx2 = rM + i * 28;
            doc.setFillColor(245, 243, 255);
            doc.rect(cx2, summaryY, 26, 16, 'F');
            doc.setFontSize(6);
            doc.setTextColor(168, 85, 247);
            doc.setFont("helvetica", "bold");
            doc.text(c.label, cx2 + 13, summaryY + 5.5, { align: 'center' });
            doc.setFontSize(8);
            doc.setTextColor(23, 23, 23);
            doc.text(c.value, cx2 + 13, summaryY + 12, { align: 'center' });
        });

        // ════════════════════════════════════════════════════════════════════
        // PAGE 5 — ASSET ALLOCATION
        // ════════════════════════════════════════════════════════════════════
        doc.addPage();
        drawSidebar("Page 5 of 7");
        drawSidebarHeader("ALLOCATION");
        drawCircleKPI("65%", "STOCKS", "Large-cap equities dominate the portfolio.", 75);
        drawCircleKPI("20%", "CRYPTO", "Digital assets held for high-growth exposure.", 155);

        drawRightTitle("ASSET", "ALLOCATION", "Portfolio composition by asset class, showing percentage distribution and absolute values.");

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("PORTFOLIO BREAKDOWN", rM, 90);
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, 94, rM + 28, 94);

        // Allocation table
        const allocData = [
            { name: 'Stocks', pct: '65%', value: '$35,230', color: [59, 130, 246] as [number, number, number] },
            { name: 'Crypto', pct: '20%', value: '$10,840', color: [245, 158, 11] as [number, number, number] },
            { name: 'Real Estate', pct: '10%', value: '$5,420', color: [16, 185, 129] as [number, number, number] },
            { name: 'Cash', pct: '5%', value: '$2,710', color: [99, 102, 241] as [number, number, number] },
        ];

        let allocY = 104;
        allocData.forEach(a => {
            // Color swatch
            doc.setFillColor(...a.color);
            doc.rect(rM, allocY, 6, 6, 'F');
            // Name
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(23, 23, 23);
            doc.text(a.name, rM + 10, allocY + 4.5);
            // Value
            doc.setFont("helvetica", "normal");
            doc.setTextColor(82, 82, 91);
            doc.text(a.value, rM + 60, allocY + 4.5, { align: 'right' });
            // Pct
            doc.setFont("helvetica", "bold");
            doc.setTextColor(168, 85, 247);
            doc.text(a.pct, rM + 80, allocY + 4.5, { align: 'right' });
            // Bar
            const barFull = 80;
            const barPct = parseFloat(a.pct) / 100;
            doc.setFillColor(228, 228, 231);
            doc.rect(rM, allocY + 8, barFull, 3, 'F');
            doc.setFillColor(...a.color);
            doc.rect(rM, allocY + 8, barFull * barPct, 3, 'F');
            allocY += 22;
        });

        // Total row
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, allocY, rM + 80, allocY);
        allocY += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(23, 23, 23);
        doc.text("TOTAL PORTFOLIO", rM, allocY + 4);
        doc.setTextColor(168, 85, 247);
        doc.text("$54,200", rM + 60, allocY + 4, { align: 'right' });
        doc.text("100%", rM + 80, allocY + 4, { align: 'right' });

        // Diversification note
        const noteY = allocY + 20;
        doc.setFillColor(245, 243, 255);
        doc.rect(rM, noteY, 108, 22, 'F');
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(168, 85, 247);
        doc.text("DIVERSIFICATION SCORE", rM + 54, noteY + 6, { align: 'center' });
        doc.setFontSize(16);
        doc.setTextColor(23, 23, 23);
        doc.text("8.4 / 10", rM + 54, noteY + 17, { align: 'center' });

        // ════════════════════════════════════════════════════════════════════
        // PAGE 6 — AI INSIGHTS & RISK
        // ════════════════════════════════════════════════════════════════════
        doc.addPage();
        drawSidebar("Page 6 of 7");
        drawSidebarHeader("RISK");
        drawCircleKPI("LOW", "RISK LEVEL", "Portfolio shows low systemic volatility.", 75);
        drawCircleKPI("4.2%", "ALPHA", "Outperforming benchmark over 12 months.", 155);

        drawRightTitle("AI", "INSIGHTS", "Machine-learning derived analysis and forward-looking risk assessment for your portfolio.");

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("AUTOMATED ANALYSIS", rM, 90);
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, 94, rM + 28, 94);

        const insights = [
            { title: "Rebalancing Opportunity", body: "NVDA holding has grown over 60%. Consider trimming 10–15% to lock in gains and reduce single-stock concentration risk." },
            { title: "Stable Core", body: "Your ETF core position (VOO) remains extremely stable relative to the broader market, providing a solid defensive base." },
            { title: "Benchmark Outperformance", body: "Portfolio alpha has exceeded S&P 500 benchmarks by 4.2% over the trailing 12-month period — a strong signal." },
            { title: "Crypto Volatility Watch", body: "Bitcoin allocation at 20% introduces meaningful drawdown risk. Consider a hard cap of 15% to maintain low-risk profile." },
        ];

        let insightY = 102;
        insights.forEach((ins, idx) => {
            doc.setFillColor(idx % 2 === 0 ? 250 : 245, 243, 255);
            doc.rect(rM, insightY, 108, 26, 'F');
            // Number badge
            doc.setFillColor(168, 85, 247);
            doc.circle(rM + 6, insightY + 7, 4, 'F');
            doc.setFontSize(7);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text(`${idx + 1}`, rM + 6, insightY + 9, { align: 'center' });
            // Title
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(23, 23, 23);
            doc.text(ins.title.toUpperCase(), rM + 14, insightY + 8);
            // Body
            doc.setFontSize(7.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(82, 82, 91);
            const bodyLines = doc.splitTextToSize(ins.body, 94);
            doc.text(bodyLines, rM + 14, insightY + 15);
            insightY += 32;
        });

        // ════════════════════════════════════════════════════════════════════
        // PAGE 7 — SUMMARY & DISCLAIMER
        // ════════════════════════════════════════════════════════════════════
        doc.addPage();
        drawSidebar("Page 7 of 7");
        drawSidebarHeader("SUMMARY");

        // Sidebar summary stats
        const sideStats = [
            { label: 'TOTAL VALUE', val: '$54,200' },
            { label: 'WEEKLY GAIN', val: '+12.5%' },
            { label: 'ALPHA', val: '+4.2%' },
            { label: 'RISK SCORE', val: 'LOW' },
            { label: 'ASSETS', val: '4 Active' },
            { label: 'REPORT', val: dateStr },
        ];
        let ssY = 55;
        sideStats.forEach(s => {
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 220, 255);
            doc.text(s.label, 37.5, ssY, { align: 'center' });
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(s.val, 37.5, ssY + 6, { align: 'center' });
            doc.setDrawColor(255, 255, 255);
            doc.setLineWidth(0.2);
            doc.line(15, ssY + 9, 60, ssY + 9);
            ssY += 18;
        });

        drawRightTitle("REPORT", "SUMMARY", "High-level recap of all metrics and forward-looking guidance for portfolio management.");

        // Key takeaway box
        doc.setFillColor(23, 23, 23);
        doc.rect(rM, 85, 108, 34, 'F');
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(168, 85, 247);
        doc.text("KEY TAKEAWAY", rM + 54, 95, { align: 'center' });
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        const takeaway = doc.splitTextToSize("Your portfolio is in excellent health with a diversification score of 8.4/10 and positive alpha. Focus on rebalancing NVDA and capping crypto exposure to sustain long-term growth.", 100);
        doc.text(takeaway, rM + 54, 104, { align: 'center' });

        // Next steps table
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("RECOMMENDED NEXT STEPS", rM, 135);
        doc.setLineWidth(0.4);
        doc.setDrawColor(23, 23, 23);
        doc.line(rM, 139, rM + 28, 139);

        const steps = [
            ["Rebalance NVDA", "Trim 10–15% of NVDA holdings to lock in gains."],
            ["Cap Crypto at 15%", "Reduce Bitcoin allocation to lower drawdown risk."],
            ["Add Bond Exposure", "Introduce 5–10% fixed income to stabilize returns."],
            ["Set Rebalance Alert", "Configure quarterly alerts to maintain target weights."],
        ];
        autoTable(doc, {
            startY: 144,
            margin: { left: rM, right: 15 },
            head: [['ACTION', 'DESCRIPTION']],
            body: steps,
            theme: 'plain',
            headStyles: { fillColor: [255, 255, 255], textColor: [168, 85, 247], fontStyle: 'bold', lineColor: [228, 228, 231], lineWidth: { bottom: 0.5 } },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: [23, 23, 23], cellWidth: 38 },
                1: { textColor: [82, 82, 91] },
            },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            styles: { font: 'helvetica', fontSize: 8, cellPadding: 5 },
        });

        // Disclaimer
        const disclaimerY = 245;
        doc.setFillColor(245, 245, 245);
        doc.rect(rM, disclaimerY, 108, 30, 'F');
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(113, 113, 122);
        doc.text("DISCLAIMER", rM + 4, disclaimerY + 6);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        const disc = doc.splitTextToSize("This report is generated by Finova Intelligence and is intended solely for informational purposes. It does not constitute financial advice. Past performance is not indicative of future results. Always consult a licensed financial advisor before making investment decisions.", 100);
        doc.text(disc, rM + 4, disclaimerY + 13);

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
