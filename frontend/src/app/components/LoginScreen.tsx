'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, LogIn, ChevronRight, Fingerprint } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface LoginScreenProps {
    onSuccess: () => void;
}

export default function LoginScreen({ onSuccess }: LoginScreenProps) {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onSuccess();
        } catch (err: unknown) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onSuccess();
        } catch (err: unknown) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Google Auth failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center p-4 relative z-10">

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
                {/* Top geometric accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl mb-4 relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Shield className="text-white w-10 h-10 relative z-10" />
                        <Fingerprint className="text-blue-500/50 w-10 h-10 absolute inset-0 m-auto animate-pulse mix-blend-screen" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        Veritas<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">.ai</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mt-2">
                        Secure Analyst Login
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded-lg mb-6 tracking-wide"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider font-bold text-zinc-400 ml-1">Enterprise Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-zinc-500" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-11 bg-zinc-900 border border-zinc-800 rounded-xl py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                placeholder="analyst@veritas.inc"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider font-bold text-zinc-400 ml-1">Access Passcode</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-zinc-500" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-11 bg-zinc-900 border border-zinc-800 rounded-xl py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-white hover:bg-zinc-200 text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <>
                                {isRegister ? 'Initialize Registration' : 'Authenticate Session'}
                                <LogIn size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <hr className="w-full border-zinc-800" />
                    <span className="px-3 text-zinc-600 text-xs uppercase font-bold tracking-wider">OR</span>
                    <hr className="w-full border-zinc-800" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full mt-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all tracking-wide"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Secure SSO
                </button>

                <div className="mt-8 text-center border-t border-zinc-900 pt-6">
                    <p className="text-zinc-500 text-sm">
                        {isRegister ? 'Already have clearance?' : 'Need temporary clearance?'}
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="ml-2 text-white hover:text-blue-400 font-bold transition-colors uppercase text-xs tracking-wider border-b border-transparent hover:border-blue-400"
                        >
                            {isRegister ? 'Authenticate' : 'Request Access'}
                        </button>
                    </p>
                </div>

            </motion.div>
        </div>
    );
}
