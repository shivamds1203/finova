import { motion } from 'framer-motion';
import { X, Calendar, DollarSign, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { FileMetadata } from '../../services/uploadService';
import { ParsedDocumentResult } from '../../services/pdfParser';
import { useCurrency } from '../../providers/CurrencyContext';
import { useState } from 'react';

interface DocumentPreviewProps {
    file: FileMetadata;
    parsedData: ParsedDocumentResult | null;
    onClose: () => void;
}

const DocumentPreview = ({ file, parsedData, onClose }: DocumentPreviewProps) => {
    const [activeTab, setActiveTab] = useState<'analysis' | 'document'>('analysis');
    const { formatCurrency } = useCurrency();


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 lg:p-12 overflow-y-auto"
        >
            <div className="absolute inset-0" onClick={onClose} />

            {/* The Document Sheet */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-white border-2 border-slate-900 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] overflow-hidden my-auto shrink-0"
            >
                {/* Close Button (Floating outside document logic) */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center transition-colors z-20 text-slate-900"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-10 lg:p-16">
                    {/* Header */}
                    <div className="flex items-end justify-between border-b-2 border-slate-900 pb-8 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-2xl">
                                F
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Finova Intelligence</h1>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Automated Asset extraction</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-slate-900 mb-1">Generated Report</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
                                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
                            </div>
                        </div>
                    </div>

                    {/* Metadata Strip */}
                    <div className="bg-slate-50 border-2 border-slate-900 rounded-xl p-6 mb-12 flex flex-wrap gap-8">
                        <div>
                            <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Source File</div>
                            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                {file.name}
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">File Type</div>
                            <div className="text-sm font-bold text-slate-900 uppercase">{file.type.split('/')[1] || 'Unknown'}</div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">File Size</div>
                            <div className="text-sm font-bold text-slate-900">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                        <div className="ml-auto">
                            <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Confidence Score</div>
                            <div className="text-sm font-black text-emerald-600 flex items-center gap-1">
                                <Target className="w-4 h-4" /> 98.4%
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-100">
                        <button
                            onClick={() => setActiveTab('analysis')}
                            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-colors relative ${activeTab === 'analysis' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            AI Analysis
                            {activeTab === 'analysis' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-slate-900" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('document')}
                            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-colors relative ${activeTab === 'document' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Original Document
                            {activeTab === 'document' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-slate-900" />
                            )}
                        </button>
                    </div>

                    {/* Body: Render Tab Content */}
                    <div className="w-full">
                        {activeTab === 'analysis' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                                {/* Left Column: Parsed Data Table */}
                                <div className="lg:col-span-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">Extracted Positions</h2>
                                    </div>

                                    {!parsedData ? (
                                        <div className="animate-pulse space-y-4">
                                            <div className="h-10 bg-slate-100 rounded border border-slate-200" />
                                            <div className="h-10 bg-slate-100 rounded border border-slate-200" />
                                            <div className="h-10 bg-slate-100 rounded border border-slate-200" />
                                        </div>
                                    ) : parsedData.extractedData.length > 0 ? (
                                        <div className="border border-slate-900 rounded-xl overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest font-black">
                                                    <tr>
                                                        <th className="px-6 py-4">Asset</th>
                                                        <th className="px-6 py-4">Symbol</th>
                                                        <th className="px-6 py-4 text-right">Value</th>
                                                        <th className="px-6 py-4 text-right">Return</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200">
                                                    {parsedData.extractedData.map((asset, i) => (
                                                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                            <td className="px-6 py-4 text-sm font-black text-slate-900">{asset.assetName}</td>
                                                            <td className="px-6 py-4 text-xs font-bold text-slate-500">{asset.symbol}</td>
                                                            <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">
                                                                {formatCurrency(asset.currentValue)}
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <span className={`text-xs font-bold flex items-center justify-end gap-1 ${asset.returnsPercentage >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                                    {asset.returnsPercentage >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                                    {Math.abs(asset.returnsPercentage)}%
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot className="bg-slate-100 border-t-2 border-slate-900">
                                                    <tr>
                                                        <td colSpan={2} className="px-6 py-4 text-sm font-black text-slate-900 uppercase tracking-widest">Total Identified Value</td>
                                                        <td colSpan={2} className="px-6 py-4 text-lg font-black text-slate-900 text-right">
                                                            {formatCurrency(parsedData.extractedData.reduce((acc, curr) => acc + curr.currentValue, 0))}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="border border-slate-200 rounded-xl p-8 text-center bg-slate-50 text-slate-500 text-sm font-medium">
                                            No investment data was structurally identified in this document.
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: AI Insights */}
                                <div className="lg:col-span-4">
                                    <div className="flex items-center gap-2 mb-6">
                                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">Analysis Notes</h2>
                                    </div>

                                    <div className="space-y-4 relative">
                                        {/* Left connection line */}
                                        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-slate-200 z-0" />

                                        {!parsedData ? (
                                            <>
                                                <div className="h-20 bg-slate-50 rounded-xl border border-slate-200 animate-pulse ml-8" />
                                                <div className="h-20 bg-slate-50 rounded-xl border border-slate-200 animate-pulse ml-8" />
                                            </>
                                        ) : (
                                            parsedData.aiInsights.map((insight, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                                    className="relative z-10 flex gap-4"
                                                >
                                                    <div className="w-5 h-5 rounded-full bg-slate-900 border-4 border-white shrink-0 mt-1 shadow-sm" />
                                                    <p className="text-sm font-medium text-slate-600 leading-relaxed pt-1">
                                                        {insight}
                                                    </p>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-[600px] border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col items-center justify-center relative">
                                {file.previewUrl ? (
                                    <iframe
                                        src={file.previewUrl}
                                        className="w-full h-full border-none"
                                        title={`${file.name} Preview`}
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Preview Unavailable</h3>
                                        <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                            The original document file was not preserved during upload or is no longer available in memory.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-20 pt-8 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <div>Finova Document Intelligence © 2026</div>
                        <div>Page 1 of 1</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DocumentPreview;
