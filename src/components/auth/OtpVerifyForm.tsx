'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function OtpVerifyForm() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //Handling Verify 
    const handleVerify = async () => {
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ email, otp }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                const { token } = await res.json();

                // Optional: store in localStorage, though you're already using HTTP-only cookie via server
                localStorage.setItem('admin-token', token);

                router.push('/sxs_admin/services');
            } else {
                const data = await res.json();
                setError(data?.error || 'OTP verification failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 p-6 rounded-2xl shadow-2xl bg-[#0F142A]">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Verify OTP</h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {/* Email */}
            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-[#1a1f3c] text-white mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 rounded bg-[#1a1f3c] text-white mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
            />

            <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={handleVerify}
                disabled={loading}
            >
                {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
        </div>
    );
}
