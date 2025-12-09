'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirect() {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            if (!isConnected) {
                // If not connected, maybe stay here or redirect home?
                // For now, let's just stop loading and show a message
                setIsLoading(false);
                return;
            }

            if (address) {
                try {
                    const response = await fetch(`/api/check-wallet?wallet=${address}`);
                    const data = await response.json();

                    if (data.exists) {
                        if (data.role === 'student') {
                            router.push('/dashboard/student');
                        } else if (data.role === 'institute') {
                            router.push('/dashboard/institute');
                        }
                    } else {
                        // Not registered, go to role selection
                        router.push('/roles');
                    }
                } catch (error) {
                    console.error("Error checking user role:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        checkUser();
    }, [address, isConnected, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Connect Your Wallet</h1>
                    <p className="text-gray-600">You need to connect your wallet to access the dashboard.</p>
                </div>
            </div>
        );
    }

    return null; // Should redirect
}
