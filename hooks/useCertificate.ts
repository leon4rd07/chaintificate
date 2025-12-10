import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { CHAINTIFICATE_ABI, CHAINTIFICATE_ADDRESS, CERTIFICATE_ABI } from '../types/contracts';
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { decodeEventLog } from 'viem';

export const useCreateCollection = () => {
    const { address: userAddress } = useAccount();
    const [pendingData, setPendingData] = useState<{ name: string; description: string; type: string } | null>(null);
    const [isApiPending, setIsApiPending] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        writeContractAsync,
        data: hash,
        isPending: isWritePending,
        error: writeError
    } = useWriteContract();

    const {
        data: receipt,
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: receiptError
    } = useWaitForTransactionReceipt({
        hash,
    });

    const createCertificateCollection = async (name: string, symbol: string, description: string, type: string) => {
        if (!CHAINTIFICATE_ADDRESS) {
            throw new Error("Chaintificate contract address is not defined");
        }
        setPendingData({ name, description, type });
        setApiError(null);
        try {
            const tx = await writeContractAsync({
                address: CHAINTIFICATE_ADDRESS as `0x${string}`,
                abi: CHAINTIFICATE_ABI,
                functionName: 'createCertificate',
                args: [name, symbol],
            });
            return tx;
        } catch (err) {
            console.error("Error creating certificate collection:", err);
            setPendingData(null);
            throw err;
        }
    };

    useEffect(() => {
        const syncToDatabase = async () => {
            if (isConfirmed && receipt && pendingData && userAddress) {
                setIsApiPending(true);
                try {
                    let newCollectionAddress: string | undefined;

                    for (const log of receipt.logs) {
                        try {
                            const decodedLog = decodeEventLog({
                                abi: CHAINTIFICATE_ABI,
                                data: log.data,
                                topics: log.topics,
                            });

                            if (decodedLog.eventName === 'CertificateCreated') {
                                newCollectionAddress = decodedLog.args.certificateContract;
                                break;
                            }
                        } catch (e) {
                            // Ignore logs that cannot be decoded or don't match
                            continue;
                        }
                    }

                    if (newCollectionAddress) {
                        const response = await fetch('/api/certificate/collection', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                address: newCollectionAddress,
                                name: pendingData.name,
                                description: pendingData.description,
                                type: pendingData.type,
                                wallet: userAddress,
                            }),
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || 'Failed to sync with database');
                        }
                    } else {
                        console.error("CertificateCreated event not found in transaction logs");
                        setApiError("Failed to retrieve new collection address from transaction");
                    }
                } catch (error: any) {
                    console.error("Error syncing to database:", error);
                    setApiError(error.message || "Error syncing to database");
                } finally {
                    setIsApiPending(false);
                    setPendingData(null); // Clear pending data to prevent re-execution
                }
            }
        };

        syncToDatabase();
    }, [isConfirmed, receipt, pendingData, userAddress]);

    return {
        createCertificateCollection,
        hash,
        isWritePending,
        isConfirming,
        isConfirmed,
        isApiPending,
        error: writeError || receiptError || (apiError ? new Error(apiError) : null)
    };
};

export const useGetAllCertificateCollection = (page = 1, limit = 10, type = 'All') => {
    const { address: userAddress } = useAccount();
    const [collections, setCollections] = useState<any[]>([]);
    const [pagination, setPagination] = useState<{ total: number; page: number; limit: number; totalPages: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollections = async () => {
            if (!userAddress) {
                setCollections([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/certificate/collection?wallet=${userAddress}&page=${page}&limit=${limit}&type=${type}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch collections');
                }

                const result = await response.json();

                // Handle new response structure { data, pagination }
                if (result.data && Array.isArray(result.data)) {
                    setCollections(result.data);
                    setPagination(result.pagination);
                } else {
                    setCollections([]);
                    setPagination(null);
                }
            } catch (err: any) {
                console.error("Error fetching collections:", err);
                setError(err.message || "Failed to fetch collections");
                setCollections([]); // Ensure collections is empty on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchCollections();
    }, [userAddress, page, limit, type]);

    return {
        collections,
        pagination,
        isLoading,
        error
    };
};



export const useGetCollectionDetail = (collectionAddress: string) => {
    const [collection, setCollection] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollection = async () => {
            if (!collectionAddress) {
                setCollection(null);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/certificate/collection/${collectionAddress}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch collection details');
                }

                const data = await response.json();
                setCollection(data);
            } catch (err: any) {
                console.error("Error fetching collection details:", err);
                setError(err.message || "Failed to fetch collection details");
                setCollection(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCollection();
    }, [collectionAddress]);

    return {
        collection,
        isLoading,
        error
    };
};

export const useCreateCertificate = () => {
    const [pendingData, setPendingData] = useState<{
        collectionAddress: string;
        recipient: string;
        tokenURI: string;
        certificateName: string;
        studentName: string;
    } | null>(null);
    const [isApiPending, setIsApiPending] = useState(false);
    const [isSynced, setIsSynced] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        writeContractAsync,
        data: hash,
        isPending: isWritePending,
        error: writeError
    } = useWriteContract();

    const {
        data: receipt,
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: receiptError
    } = useWaitForTransactionReceipt({
        hash,
    });

    const createCertificate = async (collectionAddress: string, recipient: string, tokenURI: string, certificateName: string, studentName: string) => {
        if (!collectionAddress || !recipient || !tokenURI || !certificateName) {
            throw new Error("Missing required arguments: collectionAddress, recipient, tokenURI, or certificateName");
        }

        setPendingData({ collectionAddress, recipient, tokenURI, certificateName, studentName });
        setApiError(null);
        setIsSynced(false);

        const mintPromise = async () => {
            const tx = await writeContractAsync({
                address: collectionAddress as `0x${string}`,
                abi: CERTIFICATE_ABI,
                functionName: 'safeMint',
                args: [recipient as `0x${string}`, tokenURI],
            });
            return tx;
        };

        try {
            const promise = mintPromise();
            toast.promise(promise, {
                loading: 'Minting certificate... Please confirm in your wallet.',
                success: 'Transaction submitted! Waiting for confirmation...',
                error: (err: any) => `Minting failed: ${err.message || "Unknown error"}`
            });
            const tx = await promise;
            return tx;
        } catch (err) {
            console.error("Error creating certificate:", err);
            setPendingData(null);
            throw err;
        }
    };

    useEffect(() => {
        const syncToDatabase = async () => {
            if (isConfirmed && receipt && pendingData) {
                setIsApiPending(true);
                try {
                    let tokenId: string | undefined;

                    for (const log of receipt.logs) {
                        try {
                            const decodedLog = decodeEventLog({
                                abi: CERTIFICATE_ABI,
                                data: log.data,
                                topics: log.topics,
                            });

                            if (decodedLog.eventName === 'Transfer' && decodedLog.args.to.toLowerCase() === pendingData.recipient.toLowerCase()) {
                                tokenId = decodedLog.args.tokenId.toString();
                                break;
                            }
                        } catch (e) {
                            continue;
                        }
                    }

                    if (tokenId) {
                        const response = await fetch(`/api/certificate/collection/${pendingData.collectionAddress}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                studentWallet: pendingData.recipient,
                                certificateName: pendingData.certificateName,
                                tokenId: tokenId,
                                tokenUri: pendingData.tokenURI,
                                studentName: pendingData.studentName,
                            }),
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || 'Failed to sync with database');
                        }
                        toast.success("Certificate saved to database!");
                        setIsSynced(true);
                        setIsSynced(true);
                    } else {
                        console.error("Transfer event not found in transaction logs");
                        setApiError("Failed to retrieve token ID from transaction");
                        toast.error("Failed to retrieve token ID from transaction");
                    }
                } catch (error: any) {
                    console.error("Error syncing to database:", error);
                    setApiError(error.message || "Error syncing to database");
                    toast.error(`Error syncing to database: ${error.message}`);
                } finally {
                    setIsApiPending(false);
                    setPendingData(null);
                }
            }
        };

        syncToDatabase();
    }, [isConfirmed, receipt, pendingData]);

    return {
        createCertificate,
        hash,
        isWritePending,
        isConfirming,
        isConfirmed,
        isApiPending,
        isSynced,
        error: writeError || receiptError || (apiError ? new Error(apiError) : null)
    };
};

export const useVerify = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const verifyCertificate = async (tokenUri: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/certificate/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenUri }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Verification failed');
            }

            const data = await response.json();

            if (data.id) {
                toast.success("Certificate found! Redirecting...");
                router.push(`/collection/certificate/${data.id}`);
            } else {
                throw new Error("Invalid response from server");
            }

            return data;
        } catch (err: any) {
            console.error("Error verifying certificate:", err);
            setError(err.message || "Verification failed");
            toast.error(err.message || "Certificate not found");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        verifyCertificate,
        isLoading,
        error
    };
};
