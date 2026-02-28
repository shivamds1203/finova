import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (code: CurrencyCode) => void;
    formatCurrency: (amount: number) => string;
    exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mock dynamic rates (Base: USD)
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
    USD: 1.0,
    INR: 83.25,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 150.40,
    CAD: 1.35
};

const CURRENCY_CONFIG: Record<CurrencyCode, { locale: string; symbol: string }> = {
    USD: { locale: 'en-US', symbol: '$' },
    INR: { locale: 'en-IN', symbol: '₹' },
    EUR: { locale: 'de-DE', symbol: '€' },
    GBP: { locale: 'en-GB', symbol: '£' },
    JPY: { locale: 'ja-JP', symbol: '¥' },
    CAD: { locale: 'en-CA', symbol: 'CA$' }
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
        const saved = localStorage.getItem('finova_currency');
        return (saved as CurrencyCode) || 'USD';
    });

    const setCurrency = (code: CurrencyCode) => {
        setCurrencyState(code);
        localStorage.setItem('finova_currency', code);
    };

    const formatCurrency = (amount: number) => {
        const convertedAmount = amount * EXCHANGE_RATES[currency];
        const config = CURRENCY_CONFIG[currency];

        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(convertedAmount);
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency,
            formatCurrency,
            exchangeRate: EXCHANGE_RATES[currency]
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
