import { motion } from 'framer-motion';
import { FileText, Download, Trash2, Eye, BarChart, FileSpreadsheet, FileImage } from 'lucide-react';
import { FileMetadata } from '../../services/uploadService';

interface FileCardProps {
    file: FileMetadata;
    onView: () => void;
    onDelete: () => void;
}

const FileCard = ({ file, onView, onDelete }: FileCardProps) => {

    const getIcon = () => {
        if (file.type.includes('pdf')) return <FileText className="w-6 h-6 text-rose-500" />;
        if (file.type.includes('csv') || file.type.includes('excel')) return <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
        return <FileImage className="w-6 h-6 text-blue-500" />;
    };

    const isAnalyzable = file.type.includes('pdf');
    const displaySize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-[var(--surface)]/50 backdrop-blur-[20px] p-6 rounded-[24px] border border-[var(--border)] hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            {isAnalyzable && (
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-[var(--background)] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1 z-10">
                    <BarChart className="w-3 h-3" /> Auto Extracted
                </div>
            )}

            <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[var(--surface-muted)] flex items-center justify-center border border-[var(--border)] group-hover:scale-110 transition-transform">
                    {getIcon()}
                </div>

                {/* Actions Menu */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <button onClick={onView} className="w-8 h-8 rounded-full bg-[var(--surface-muted)]/50 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors border border-white/10 backdrop-blur-md">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[var(--surface-muted)]/50 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors border border-white/10 backdrop-blur-md">
                        <Download className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} className="w-8 h-8 rounded-full bg-[var(--surface-muted)]/50 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors border border-white/10 backdrop-blur-md">
                        <Trash2 className="w-4 h-4 text-rose-500 hover:text-white" />
                    </button>
                </div>
            </div>

            <h4 className="font-bold text-[var(--text-primary)] truncate text-lg mb-1">{file.name}</h4>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                </span>
                <span className="text-xs font-black text-[var(--text-primary)] bg-[var(--surface-muted)] px-2 py-1 rounded-md">
                    {displaySize}
                </span>
            </div>
        </motion.div>
    );
};

export default FileCard;
