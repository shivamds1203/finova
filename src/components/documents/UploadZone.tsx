import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, XCircle, FileImage, FileSpreadsheet } from 'lucide-react';
import { simulateFileUpload, FileMetadata } from '../../services/uploadService';

interface UploadZoneProps {
    onUploadComplete: (file: FileMetadata) => void;
}

const UploadZone = ({ onUploadComplete }: UploadZoneProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingFile, setUploadingFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleDragEvent = useCallback((e: React.DragEvent, isDragIn: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isDragIn);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) await handleFileUpload(file);
    }, []);

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) await handleFileUpload(file);
    };

    const handleFileUpload = async (file: File) => {
        const validTypes = ['application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (!validTypes.includes(file.type)) {
            setError("Only PDF, CSV, and Excel files are supported.");
            return;
        }

        setUploadingFile(file);
        setError(null);
        setProgress(0);

        try {
            const metadata = await simulateFileUpload(file, setProgress);
            setTimeout(() => {
                onUploadComplete(metadata);
                setUploadingFile(null);
            }, 800); // Give user time to see 100% completion tick
        } catch (err: any) {
            setError(err.message || "Upload failed");
            setUploadingFile(null);
        }
    };

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return <FileText className="w-8 h-8 text-rose-500" />;
        if (type.includes('csv') || type.includes('excel') || type.includes('spreadsheet')) return <FileSpreadsheet className="w-8 h-8 text-emerald-500" />;
        return <FileImage className="w-8 h-8 text-blue-500" />;
    };

    return (
        <div className="w-full">
            {!uploadingFile ? (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    onDragEnter={(e) => handleDragEvent(e, true)}
                    onDragLeave={(e) => handleDragEvent(e, false)}
                    onDragOver={(e) => handleDragEvent(e, true)}
                    onDrop={handleDrop}
                    className={`
                        relative overflow-hidden w-full h-[300px] rounded-[32px] border border-dashed transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center justify-center cursor-pointer backdrop-blur-[10px]
                        ${isDragging ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/20 hover:border-white/40 bg-[var(--surface-muted)]/30'}
                    `}
                >
                    <input
                        type="file"
                        accept=".pdf,.csv,.xlsx"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    <motion.div
                        animate={{ y: isDragging ? -10 : 0, scale: isDragging ? 1.05 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-20 h-20 rounded-[24px] bg-[var(--surface)] border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center mb-6 backdrop-blur-md"
                    >
                        <UploadCloud className={`w-10 h-10 ${isDragging ? 'text-blue-500' : 'text-text-secondary'}`} />
                    </motion.div>

                    <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 tracking-tight">
                        {isDragging ? "Drop artifact here" : "Drag your investment PDF here"}
                    </h3>
                    <p className="text-text-secondary font-medium text-sm">
                        or click to browse supported files (PDF, CSV, XLSX)
                    </p>

                    {error && (
                        <div className="absolute bottom-6 flex items-center gap-2 text-rose-500 bg-rose-50 px-4 py-2 rounded-xl text-xs font-bold">
                            <XCircle className="w-4 h-4" /> {error}
                        </div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-[300px] rounded-[32px] border border-white/10 bg-[var(--surface-muted)]/30 backdrop-blur-md flex flex-col items-center justify-center p-10 relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="w-20 h-20 rounded-[28px] bg-[var(--surface)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center mb-8 relative z-10 border border-white/5 backdrop-blur-xl">
                        {progress === 100 ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                {getFileIcon(uploadingFile.type)}
                            </motion.div>
                        )}
                    </div>

                    <h3 className="text-lg font-black text-[var(--text-primary)] mb-6 z-10 truncate max-w-[80%]">
                        {uploadingFile.name}
                    </h3>

                    <div className="w-full max-w-md bg-[var(--surface)] h-4 rounded-full overflow-hidden border border-[var(--border-subtle)] z-10 p-0.5">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                            style={{ width: `${progress}%` }}
                            layout
                        />
                    </div>
                    <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-4 z-10">
                        {progress === 100 ? 'Securely Uploaded' : `Uploading: ${progress}%`}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default UploadZone;
