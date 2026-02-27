import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';

interface FinancialData {
    income: number;
    expenses: number;
    savings: number;
    debt: number;
    investmentGrowth: number;
}

export const useFinancialHealth = (data: FinancialData) => {
    const [score, setScore] = useState(0);
    const [prevScore, setPrevScore] = useState(0);

    const calculatedScore = useMemo(() => {
        // 1. Savings Ratio (40% weight) - Target: 20%+
        const savingsRatio = data.income > 0 ? (data.savings / data.income) : 0;
        const savingsScore = Math.min((savingsRatio / 0.2) * 100, 100) * 0.4;

        // 2. Expense-to-Income Ratio (30% weight) - Target: <50%
        const expenseRatio = data.income > 0 ? (data.expenses / data.income) : 1;
        const expenseScore = Math.max(0, (1 - expenseRatio / 0.8) * 100) * 0.3;

        // 3. Debt Ratio (20% weight) - Target: 0 (Inverse)
        const debtRatio = data.income > 0 ? (data.debt / data.income) : 1;
        const debtScore = Math.max(0, (1 - debtRatio / 0.4) * 100) * 0.2;

        // 4. Investment Growth (10% weight) - Positive growth adds points
        const growthScore = Math.min(Math.max(0, data.investmentGrowth * 5), 100) * 0.1;

        return Math.round(savingsScore + expenseScore + debtScore + growthScore);
    }, [data]);

    useEffect(() => {
        setPrevScore(score);
        setScore(calculatedScore);

        // Micro-celebration if score improves past a threshold or jump
        if (calculatedScore > prevScore && calculatedScore >= 80 && prevScore < 80) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#3b82f6', '#fbbf24']
            });
        }
    }, [calculatedScore]);

    const getStatus = () => {
        if (score >= 80) return { label: 'Excellent', color: '#10b981' };
        if (score >= 60) return { label: 'Good', color: '#3b82f6' };
        if (score >= 40) return { label: 'Fair', color: '#fbbf24' };
        return { label: 'Needs Attention', color: '#f43f5e' };
    };

    return { score, status: getStatus() };
};
