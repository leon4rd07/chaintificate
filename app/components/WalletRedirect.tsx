'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function WalletRedirect() {
    const { address, isConnected, isReconnecting } = useAccount();
    const router = useRouter();

    useEffect(() => {
        const checkWallet = async () => {
            if (isConnected && address && !isReconnecting) {
                try {
                    const response = await fetch(`/api/check-wallet?wallet=${address}`);
                    const data = await response.json();

                    if (data.exists) {
                        // User is registered, do not redirect automatically
                        // They will be redirected only upon first registration via the register page
                    } else {
                        // If not registered, redirect to dashboard (role selection) if on home page
                        if (window.location.pathname === '/') {
                            router.push('/dashboard');
                        }
                    }
                } catch (error) {
                    console.error("Error checking wallet:", error);
                }
            }
        };

        checkWallet();
    }, [isConnected, address, isReconnecting, router]);

    return null;
}
