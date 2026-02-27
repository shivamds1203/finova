import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Search, Filter } from 'lucide-react';
import UploadZone from '../components/documents/UploadZone';
import FileCard from '../components/documents/FileCard';
import DocumentPreview from '../components/documents/DocumentPreview';
import { FileMetadata } from '../services/uploadService';
import { getUploadedFiles } from '../services/cloudStorage';
import { parseDocumentData, ParsedDocumentResult } from '../services/pdfParser';
import Navbar from '../components/layout/Navbar';
import MainLayout from '../components/layout/MainLayout';

const Documents = () => {
    const [files, setFiles] = useState<FileMetadata[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);
    const [parsedData, setParsedData] = useState<ParsedDocumentResult | null>(null);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        const loaded = await getUploadedFiles();
        setFiles(loaded);
    };

    const handleUploadComplete = async (metadata: FileMetadata) => {
        // Optimistic UI update
        setFiles(prev => [metadata, ...prev]);

        // Let cloudStorage sync in background
        const { saveFileMetadata } = await import('../services/cloudStorage');
        await saveFileMetadata(metadata);
        await loadFiles(); // Refetch truthful state
    };

    const handleViewDocument = async (file: FileMetadata) => {
        setSelectedFile(file);
        setParsedData(null); // Reset while loading

        if (file.type.includes('pdf')) {
            const data = await parseDocumentData(file.name);
            setParsedData(data);
        }
    };

    const handleDeleteDocument = async (id: string) => {
        const { deleteFile } = await import('../services/cloudStorage');
        await deleteFile(id);
        await loadFiles();
    };

    return (
        <MainLayout>
            {/* Geometric Background Overlay */}
            <div
                className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
                style={{
                    backgroundImage: 'url(/geometric-bg.png)', // We will serve the generated image here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10 pt-4">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest">Document Intelligence module</span>
                        </div>
                        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Financial Vault</h1>
                        <p className="text-text-secondary font-medium mt-2 max-w-2xl leading-relaxed">
                            Upload, analyze, and secure your financial documents. Our AI automatically extracts positions and generates production-ready structural reports.
                        </p>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="card-premium p-1 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-primary/5 to-purple-500/5 opacity-50 transition-opacity" />
                    <UploadZone onUploadComplete={handleUploadComplete} />
                </div>

                {/* File List Section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--surface-muted)] border-2 border-[var(--border)] shadow-sm flex items-center justify-center">
                                <FolderOpen className="w-5 h-5 text-[var(--text-primary)]" />
                            </div>
                            <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">Your Documents</h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Search files..."
                                    className="pl-9 pr-4 py-2 bg-[var(--surface-muted)]/50 backdrop-blur-md border border-white/10 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-64 text-[var(--text-primary)] transition-all"
                                />
                            </div>
                            <button className="w-10 h-10 rounded-[12px] bg-[var(--surface-muted)]/50 backdrop-blur-md border border-white/10 hover:border-blue-500/50 flex items-center justify-center transition-all text-text-secondary">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {files.length === 0 ? (
                        <div className="w-full h-48 border border-dashed border-white/20 rounded-[24px] flex flex-col items-center justify-center text-text-secondary bg-[var(--surface-muted)]/30 backdrop-blur-sm">
                            <FolderOpen className="w-8 h-8 mb-4 opacity-50" />
                            <p className="font-bold">No documents in vault</p>
                            <p className="text-xs mt-1">Upload a PDF or CSV above to begin</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {files.map((file) => (
                                    <motion.div
                                        key={file.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FileCard
                                            file={file}
                                            onView={() => handleViewDocument(file)}
                                            onDelete={() => handleDeleteDocument(file.id)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

            </div>

            <AnimatePresence>
                {selectedFile && (
                    <DocumentPreview
                        file={selectedFile}
                        parsedData={parsedData}
                        onClose={() => setSelectedFile(null)}
                    />
                )}
            </AnimatePresence>
        </MainLayout>
    );
};

export default Documents;
