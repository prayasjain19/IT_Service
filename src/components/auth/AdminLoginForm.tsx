'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //Handling Login 
    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/sxs_admin/verify'); // OTP page
            } else {
                setError(data?.error || 'Invalid email or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 p-6 rounded-2xl shadow-2xl bg-[#0F142A] border border-purple-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">🔐 Admin Login</h2>
        {/* Error Block */}
            {error && <p className="text-red-500 mb-3">{error}</p>}

            {/* Email */}
            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-3 rounded bg-[#1a1f3c] text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password */}
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 rounded bg-[#1a1f3c] text-white placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
        </div>
    );
}
