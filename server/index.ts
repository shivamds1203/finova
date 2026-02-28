import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.json({ message: 'Finova API is running', version: '1.0.0', timestamp: new Date().toISOString() });
});

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    res.json({
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: '1', email, name: 'Alex Sterling', plan: 'PRO', avatar: null }
    });
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required' });
    res.status(201).json({
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: '2', email, name, plan: 'FREE', avatar: null }
    });
});

app.post('/api/auth/logout', (_req, res) => {
    res.json({ message: 'Logged out successfully' });
});

app.post('/api/auth/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    res.json({ message: `Password reset link sent to ${email}` });
});

app.get('/api/auth/me', (_req, res) => {
    res.json({ id: '1', email: 'alex@finova.io', name: 'Alex Sterling', plan: 'PRO', avatar: null });
});

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
app.get('/api/dashboard/overview', (_req, res) => {
    res.json({
        totalBalance: 124850.00,
        totalIncome: 8500.00,
        totalExpenses: 3240.00,
        totalSavings: 5260.00,
        savingsRate: 0.619,
        netWorth: 312000.00,
        currency: 'USD'
    });
});

app.get('/api/dashboard/financial-health', (_req, res) => {
    res.json({
        score: 82,
        grade: 'A',
        breakdown: {
            savingsRate: 90,
            budgetAdherence: 78,
            investmentGrowth: 85,
            debtRatio: 72
        },
        insights: [
            'Your savings rate is excellent at 61.9%',
            'Consider paying off credit card debt to improve score',
            'Investment portfolio is outperforming S&P 500'
        ]
    });
});

// ─────────────────────────────────────────────
// EXPENSES
// ─────────────────────────────────────────────
app.get('/api/expenses', (req, res) => {
    const { month, year, category } = req.query;
    res.json({
        expenses: [
            { id: '1', description: 'Starbucks Coffee', category: 'Dining', amount: 6.50, date: '2026-02-28', recurring: false },
            { id: '2', description: 'Netflix Subscription', category: 'Entertainment', amount: 15.99, date: '2026-02-27', recurring: true },
            { id: '3', description: 'Uber Ride', category: 'Transport', amount: 24.50, date: '2026-02-26', recurring: false },
            { id: '4', description: 'Rent Payment', category: 'Housing', amount: 2400.00, date: '2026-02-25', recurring: true },
            { id: '5', description: 'Grocery Shopping', category: 'Food', amount: 120.00, date: '2026-02-24', recurring: false },
        ],
        total: 2566.99,
        month: month || '02',
        year: year || '2026'
    });
});

app.post('/api/expenses', (req, res) => {
    const { description, category, amount, date, recurring } = req.body;
    if (!description || !amount) return res.status(400).json({ error: 'Description and amount are required' });
    res.status(201).json({
        id: Math.random().toString(36).substring(7),
        description, category, amount, date: date || new Date().toISOString().split('T')[0], recurring: recurring || false,
        createdAt: new Date().toISOString()
    });
});

app.put('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, ...req.body, updatedAt: new Date().toISOString() });
});

app.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Expense ${id} deleted successfully` });
});

app.get('/api/expenses/categories', (_req, res) => {
    res.json({
        categories: [
            { name: 'Housing', total: 2400, percentage: 41, color: '#6366f1' },
            { name: 'Food', total: 980, percentage: 17, color: '#10b981' },
            { name: 'Transport', total: 580, percentage: 10, color: '#f59e0b' },
            { name: 'Entertainment', total: 310, percentage: 5, color: '#ec4899' },
            { name: 'Dining', total: 420, percentage: 7, color: '#8b5cf6' },
            { name: 'Others', total: 1180, percentage: 20, color: '#64748b' },
        ]
    });
});

// ─────────────────────────────────────────────
// INVESTMENTS
// ─────────────────────────────────────────────
app.get('/api/investments', (_req, res) => {
    res.json({
        totalValue: 4512150.00,
        totalCost: 3800000.00,
        totalGain: 712150.00,
        gainPercentage: 18.74,
        holdings: [
            { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 182.63, value: 9131.50, gain: 12.4, trend: 'up' },
            { symbol: 'NVDA', name: 'Nvidia Corp.', shares: 20, price: 785.38, value: 15707.60, gain: 69.0, trend: 'up' },
            { symbol: 'TSLA', name: 'Tesla Inc.', shares: 30, price: 202.64, value: 6079.20, gain: -2.11, trend: 'down' },
            { symbol: 'BTC', name: 'Bitcoin', shares: 0.5, price: 62450.00, value: 31225.00, gain: 3.85, trend: 'up' },
        ],
        performance: [
            { month: 'Jan', value: 3900000 },
            { month: 'Feb', value: 4100000 },
            { month: 'Mar', value: 4050000 },
            { month: 'Apr', value: 4300000 },
            { month: 'May', value: 4400000 },
            { month: 'Jun', value: 4512150 }
        ]
    });
});

app.get('/api/investments/:symbol', (req, res) => {
    const { symbol } = req.params;
    res.json({
        symbol,
        name: 'Sample Asset',
        currentPrice: 182.63,
        change24h: 1.24,
        changePercent: 0.68,
        high52w: 198.23,
        low52w: 124.17,
        marketCap: '2.8T',
        volume: '52.3M',
        history: [170, 175, 172, 178, 180, 182]
    });
});

app.post('/api/investments/buy', (req, res) => {
    const { symbol, shares, price } = req.body;
    if (!symbol || !shares || !price) return res.status(400).json({ error: 'Symbol, shares and price are required' });
    res.status(201).json({
        transactionId: 'TXN-' + Date.now(),
        type: 'BUY', symbol, shares, price,
        totalCost: shares * price,
        timestamp: new Date().toISOString(),
        status: 'EXECUTED'
    });
});

app.post('/api/investments/sell', (req, res) => {
    const { symbol, shares, price } = req.body;
    if (!symbol || !shares || !price) return res.status(400).json({ error: 'Symbol, shares and price are required' });
    res.status(201).json({
        transactionId: 'TXN-' + Date.now(),
        type: 'SELL', symbol, shares, price,
        totalValue: shares * price,
        timestamp: new Date().toISOString(),
        status: 'EXECUTED'
    });
});

// ─────────────────────────────────────────────
// WALLET
// ─────────────────────────────────────────────
app.get('/api/wallet', (_req, res) => {
    res.json({
        balance: 24750.00,
        cards: [
            { id: 'c1', type: 'VISA', last4: '4242', expiry: '12/28', balance: 12500.00, limit: 15000.00, color: 'purple' },
            { id: 'c2', type: 'Mastercard', last4: '8888', expiry: '09/27', balance: 8200.00, limit: 10000.00, color: 'blue' },
        ],
        recentTransactions: [
            { id: 't1', description: 'Amazon Purchase', amount: -89.99, date: '2026-02-28', type: 'debit' },
            { id: 't2', description: 'Salary Credit', amount: 8500.00, date: '2026-02-27', type: 'credit' },
            { id: 't3', description: 'ATM Withdrawal', amount: -200.00, date: '2026-02-26', type: 'debit' },
        ]
    });
});

app.post('/api/wallet/transfer', (req, res) => {
    const { fromCard, toCard, amount } = req.body;
    if (!fromCard || !toCard || !amount) return res.status(400).json({ error: 'fromCard, toCard and amount are required' });
    res.status(201).json({
        transactionId: 'XFER-' + Date.now(),
        fromCard, toCard, amount,
        status: 'COMPLETED',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/wallet/add-card', (req, res) => {
    const { cardNumber, expiry, cvv, name } = req.body;
    if (!cardNumber || !expiry || !cvv || !name) return res.status(400).json({ error: 'All card fields are required' });
    res.status(201).json({
        id: 'c' + Date.now(),
        type: cardNumber.startsWith('4') ? 'VISA' : 'Mastercard',
        last4: cardNumber.slice(-4),
        expiry,
        status: 'ACTIVE'
    });
});

// ─────────────────────────────────────────────
// CREDIT
// ─────────────────────────────────────────────
app.get('/api/credit', (_req, res) => {
    res.json({
        score: 742,
        grade: 'Good',
        change: +12,
        factors: [
            { name: 'Payment History', score: 95, impact: 'High' },
            { name: 'Credit Utilization', score: 68, impact: 'High' },
            { name: 'Credit Age', score: 72, impact: 'Medium' },
            { name: 'Account Mix', score: 80, impact: 'Low' },
            { name: 'New Inquiries', score: 90, impact: 'Low' }
        ],
        history: [
            { month: 'Sep', score: 710 }, { month: 'Oct', score: 718 },
            { month: 'Nov', score: 725 }, { month: 'Dec', score: 730 },
            { month: 'Jan', score: 738 }, { month: 'Feb', score: 742 }
        ]
    });
});

// ─────────────────────────────────────────────
// DOCUMENTS
// ─────────────────────────────────────────────
app.get('/api/documents', (_req, res) => {
    res.json({
        documents: [
            { id: 'd1', name: 'portfolio_2025.pdf', type: 'application/pdf', size: 245760, uploadedAt: '2026-02-20T10:00:00Z', status: 'completed' },
            { id: 'd2', name: 'expense_report_jan.pdf', type: 'application/pdf', size: 102400, uploadedAt: '2026-02-18T14:30:00Z', status: 'completed' },
        ]
    });
});

app.post('/api/documents/upload', (req, res) => {
    const { fileName, fileType, fileSize } = req.body;
    if (!fileName) return res.status(400).json({ error: 'fileName is required' });
    res.status(201).json({
        id: 'd' + Date.now(),
        name: fileName,
        type: fileType || 'application/pdf',
        size: fileSize || 0,
        uploadedAt: new Date().toISOString(),
        status: 'completed',
        url: `https://finova-storage.s3.amazonaws.com/${Date.now()}/${fileName}`
    });
});

app.post('/api/documents/:id/parse', (req, res) => {
    const { id } = req.params;
    res.json({
        documentId: id,
        isFinancialReport: true,
        extractedData: [
            { assetName: 'NVIDIA Corp.', symbol: 'NVDA', amountInvested: 5000, currentValue: 8450.25, returnsPercentage: 69.0, dateOfSnapshot: '2026-02-28' },
            { assetName: 'Vanguard S&P 500 ETF', symbol: 'VOO', amountInvested: 15000, currentValue: 17200.00, returnsPercentage: 14.6, dateOfSnapshot: '2026-02-28' }
        ],
        aiInsights: [
            'NVDA holding has grown over 60%, consider rebalancing.',
            'Your ETF core position is extremely stable.'
        ]
    });
});

app.delete('/api/documents/:id', (req, res) => {
    res.json({ message: `Document ${req.params.id} deleted successfully` });
});

// ─────────────────────────────────────────────
// REPORTS
// ─────────────────────────────────────────────
app.get('/api/reports/transactions', (req, res) => {
    const { startDate, endDate, category } = req.query;
    res.json({
        transactions: [
            { id: '1', date: '2026-02-27', description: 'Apple Store Purchase', category: 'Shopping', amount: -1299.00, status: 'Completed' },
            { id: '2', date: '2026-02-26', description: 'Monthly Salary', category: 'Income', amount: 8500.00, status: 'Completed' },
            { id: '3', date: '2026-02-25', description: 'Starbucks Coffee', category: 'Dining', amount: -6.50, status: 'Completed' },
            { id: '4', date: '2026-02-24', description: 'Rent Payment', category: 'Housing', amount: -2400.00, status: 'Pending' },
        ],
        total: 124,
        page: 1,
        pageSize: 10
    });
});

app.get('/api/reports/summary', (req, res) => {
    const { month, year } = req.query;
    res.json({
        month: month || '02', year: year || '2026',
        income: 8500.00,
        expenses: 3240.00,
        savings: 5260.00,
        topCategory: 'Housing',
        savingsRate: 61.9,
        cashFlow: [
            { name: 'Jan', expense: 2100, income: 4500 },
            { name: 'Feb', expense: 2800, income: 4200 },
            { name: 'Mar', expense: 3240, income: 4800 },
        ]
    });
});

app.get('/api/reports/export', (req, res) => {
    const { format } = req.query;
    res.json({ message: `Report export in ${format || 'CSV'} format initiated`, downloadUrl: 'https://finova.io/reports/download/mock-report.csv' });
});

// ─────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────
app.get('/api/analytics/spending-trends', (_req, res) => {
    res.json({
        trends: [
            { month: 'Sep', total: 3100 }, { month: 'Oct', total: 2900 },
            { month: 'Nov', total: 3400 }, { month: 'Dec', total: 4200 },
            { month: 'Jan', total: 2800 }, { month: 'Feb', total: 3240 }
        ],
        avgSpending: 3273.33,
        trend: 'down',
        changePercent: -5.3
    });
});

app.get('/api/analytics/income-vs-expenses', (_req, res) => {
    res.json([
        { name: 'Jan', income: 4500, expense: 2100 },
        { name: 'Feb', income: 4200, expense: 2800 },
        { name: 'Mar', income: 4800, expense: 3240 },
        { name: 'Apr', income: 5100, expense: 2400 },
        { name: 'May', income: 4900, expense: 2900 },
        { name: 'Jun', income: 5500, expense: 3500 },
    ]);
});

// ─────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────
app.get('/api/settings', (_req, res) => {
    res.json({
        profile: { name: 'Alex Sterling', email: 'alex@finova.io', phone: '+1 (555) 000-0000', avatar: null },
        preferences: { currency: 'USD', theme: 'dark', language: 'en', notifications: true },
        security: { twoFactor: false, biometrics: true, sessionTimeout: 30 }
    });
});

app.put('/api/settings/profile', (req, res) => {
    res.json({ ...req.body, updatedAt: new Date().toISOString() });
});

app.put('/api/settings/preferences', (req, res) => {
    res.json({ ...req.body, updatedAt: new Date().toISOString() });
});

app.put('/api/settings/change-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords are required' });
    res.json({ message: 'Password changed successfully' });
});

// ─────────────────────────────────────────────
// AI CHAT
// ─────────────────────────────────────────────
app.post('/api/ai/chat', (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const responses: Record<string, string> = {
        default: "Based on your financial data, I recommend increasing your emergency fund to cover 6 months of expenses.",
        invest: "Your investment portfolio is performing well. NVDA has gained 69% — consider taking partial profits.",
        save: "Your current savings rate is 61.9%. You're on track to reach your $100k goal in 14 months.",
        spend: "Your highest spending category is Housing at 41%. This is within the recommended 30-40% range.",
    };
    const keyword = Object.keys(responses).find(k => message.toLowerCase().includes(k)) || 'default';
    res.json({ reply: responses[keyword], timestamp: new Date().toISOString(), context: 'financial_advisor' });
});

// ─────────────────────────────────────────────
// MARKET DATA
// ─────────────────────────────────────────────
app.get('/api/market/stocks', (_req, res) => {
    res.json([
        { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 1.24, changePercent: 0.68, trend: 'up' },
        { symbol: 'NVDA', name: 'Nvidia Corp.', price: 785.38, change: 33.96, changePercent: 4.52, trend: 'up' },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 202.64, change: -4.36, changePercent: -2.11, trend: 'down' },
        { symbol: 'MSFT', name: 'Microsoft', price: 415.26, change: 2.18, changePercent: 0.53, trend: 'up' },
    ]);
});

app.get('/api/market/crypto', (_req, res) => {
    res.json([
        { symbol: 'BTC', name: 'Bitcoin', price: 62450.00, change: 2322.50, changePercent: 3.85, trend: 'up' },
        { symbol: 'ETH', name: 'Ethereum', price: 3450.00, change: -120.00, changePercent: -3.36, trend: 'down' },
        { symbol: 'SOL', name: 'Solana', price: 145.20, change: 8.55, changePercent: 6.25, trend: 'up' },
    ]);
});

app.listen(PORT, () => {
    console.log(`🚀 Finova server running on http://localhost:${PORT}`);
});
