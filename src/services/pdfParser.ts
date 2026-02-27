// src/services/pdfParser.ts

export interface ParsedInvestmentData {
    assetName: string;
    symbol: string;
    amountInvested: number;
    currentValue: number;
    returnsPercentage: number;
    dateOfSnapshot: string;
}

export interface ParsedDocumentResult {
    isFinancialReport: boolean;
    extractedData: ParsedInvestmentData[];
    aiInsights: string[];
}

// Simulates an AI extraction process that takes 1-2 seconds and returns structured JSON
export const parseDocumentData = async (fileName: string): Promise<ParsedDocumentResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {

            // Just for simulation: if the file name contains "expense", we act differently.
            const isExpense = fileName.toLowerCase().includes('expense');

            if (isExpense) {
                resolve({
                    isFinancialReport: false,
                    extractedData: [],
                    aiInsights: [
                        "Identified high spending in 'Dining Out' category.",
                        "Recurring subscription 'Cloud Storage Pro' was flagged."
                    ]
                });
                return;
            }

            // Default to simulating investment data extraction
            resolve({
                isFinancialReport: true,
                extractedData: [
                    {
                        assetName: "NVIDIA Corp.",
                        symbol: "NVDA",
                        amountInvested: 5000,
                        currentValue: 8450.25,
                        returnsPercentage: 69.0,
                        dateOfSnapshot: new Date().toISOString().split('T')[0]
                    },
                    {
                        assetName: "Vanguard S&P 500 ETF",
                        symbol: "VOO",
                        amountInvested: 15000,
                        currentValue: 17200.00,
                        returnsPercentage: 14.6,
                        dateOfSnapshot: new Date().toISOString().split('T')[0]
                    },
                    {
                        assetName: "Bitcoin",
                        symbol: "BTC",
                        amountInvested: 3000,
                        currentValue: 3105.50,
                        returnsPercentage: 3.5,
                        dateOfSnapshot: new Date().toISOString().split('T')[0]
                    }
                ],
                aiInsights: [
                    "NVDA holding has grown over 60%, consider rebalancing to lock in gains.",
                    "Your ETF core position remains extremely stable relative to the broader market.",
                    "Portfolio alpha has exceeded benchmarks by 4.2% over a 12-month period."
                ]
            });
        }, 1800); // Simulate heavy AI parsing load
    });
}
