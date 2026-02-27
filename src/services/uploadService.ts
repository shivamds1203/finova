// src/services/uploadService.ts

export interface FileMetadata {
    id: string;
    name: string;
    size: number;
    type: string;
    status: 'uploading' | 'completed' | 'error';
    progress: number;
    url?: string;
    previewUrl?: string; // Client-side URL for previewing the document inline
    uploadedAt: Date;
}

export const simulateFileUpload = (
    file: File,
    onProgress: (progress: number) => void
): Promise<FileMetadata> => {
    return new Promise((resolve, reject) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                onProgress(progress);
                resolve({
                    id: Math.random().toString(36).substring(7),
                    name: file.name,
                    size: file.size,
                    type: file.type || 'application/pdf',
                    status: 'completed',
                    progress: 100,
                    uploadedAt: new Date(),
                    previewUrl: URL.createObjectURL(file), // Generate local object URL
                });
            } else {
                onProgress(progress);
            }
        }, 300); // Simulate network speed

        // Randomly simulate a failure for robust UI testing (5% chance)
        if (Math.random() > 0.95) {
            clearInterval(interval);
            reject(new Error("Network Error: Upload failed"));
        }
    });
};
