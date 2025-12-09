import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CHAINTIFICATE_ABI, CHAINTIFICATE_ADDRESS } from '../types/contracts';
import { toast } from "sonner";

export const useRegisterInstitution = () => {
    const {
        writeContractAsync,
        data: hash,
        isPending: isWritePending,
        error: writeError
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: receiptError
    } = useWaitForTransactionReceipt({
        hash,
    });

    const registerInstitution = async (institutionAddress: string) => {
        if (!institutionAddress) {
            throw new Error("Institution address is required");
        }

        const registerPromise = async () => {
            const tx = await writeContractAsync({
                address: CHAINTIFICATE_ADDRESS as `0x${string}`,
                abi: CHAINTIFICATE_ABI,
                functionName: 'registerInstitution',
                args: [institutionAddress as `0x${string}`],
            });
            return tx;
        };

        try {
            const promise = registerPromise();
            toast.promise(promise, {
                loading: 'Registering institution...',
                success: 'Institution registered successfully!',
                error: (err: any) => `Registration failed: ${err.message || "Unknown error"}`
            });
            const tx = await promise;
            return tx;
        } catch (err) {
            console.error("Error registering institution:", err);
            throw err;
        }
    };

    return {
        registerInstitution,
        hash,
        isWritePending,
        isConfirming,
        isConfirmed,
        error: writeError || receiptError
    };
};
