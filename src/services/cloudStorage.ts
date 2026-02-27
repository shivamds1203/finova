// src/services/cloudStorage.ts
import { FileMetadata } from './uploadService';

// Simulated in-memory database of uploaded files
let uploadedFiles: FileMetadata[] = [];

export const saveFileMetadata = async (metadata: FileMetadata): Promise<void> => {
    // Simulate database latency
    return new Promise((resolve) => {
        setTimeout(() => {
            // Assign a fake S3/Cloudfront URL
            const finalMetadata = {
                ...metadata,
                url: `https://finova-storage-bucket.s3.amazonaws.com/${metadata.id}/${metadata.name}`
            };
            uploadedFiles = [finalMetadata, ...uploadedFiles];
            resolve();
        }, 500);
    });
};

export const getUploadedFiles = async (): Promise<FileMetadata[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...uploadedFiles]), 300);
    });
};

export const deleteFile = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            uploadedFiles = uploadedFiles.filter(f => f.id !== id);
            resolve();
        }, 400);
    });
};
