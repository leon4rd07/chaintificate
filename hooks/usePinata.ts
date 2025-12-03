import { useState } from "react";
import { toast } from "sonner";

export const usePinata = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedData, setUploadedData] = useState<{ cid: string; url: string } | null>(null);

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        setError(null);
        setUploadedData(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/pinata", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to upload file to Pinata");
            }

            const data = await response.json();
            setUploadedData(data);
            return data;
        } catch (err: any) {
            console.error("Error uploading to Pinata:", err);
            setError(err.message || "Failed to upload to Pinata");
            throw err;
        } finally {
            setIsUploading(false);
        }
    };

    const uploadJSON = async (jsonData: any) => {
        setIsUploading(true);
        setError(null);
        setUploadedData(null);

        try {
            const jsonString = JSON.stringify(jsonData);
            const blob = new Blob([jsonString], { type: "application/json" });
            const file = new File([blob], "data.json", { type: "application/json" });

            return await uploadFile(file);
        } catch (err: any) {
            console.error("Error uploading JSON to Pinata:", err);
            setError(err.message || "Failed to upload JSON to Pinata");
            throw err;
        } finally {
            setIsUploading(false);
        }
    };

    const uploadImageAndMetadata = async (file: File, metadata: any) => {
        setIsUploading(true);
        setError(null);
        setUploadedData(null);

        const uploadPromise = async () => {
            // 1. Upload Image
            const imageUpload = await uploadFile(file);

            // 2. Construct Metadata with Image CID/URL
            const finalMetadata = {
                ...metadata,
                image: imageUpload.url, // Or `ipfs://${imageUpload.cid}` depending on preference
                image_cid: imageUpload.cid
            };

            // 3. Upload JSON
            return await uploadJSON(finalMetadata);
        };

        try {
            const promise = uploadPromise();
            toast.promise(promise, {
                loading: 'Uploading image and metadata to IPFS...',
                success: 'Metadata uploaded successfully!',
                error: (err) => `Upload failed: ${err.message || "Unknown error"}`
            });
            const result = await promise;
            return result;
        } catch (err: any) {
            console.error("Error in upload flow:", err);
            setError(err.message || "Failed to upload image and metadata");
            throw err;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadFile,
        uploadJSON,
        uploadImageAndMetadata,
        isUploading,
        error,
        uploadedData,
    };
};
