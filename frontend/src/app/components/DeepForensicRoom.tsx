'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Network, Disc, Activity, AlertCircle, Eye, ShieldAlert, Cpu } from 'lucide-react';
import SupremeCourtAgent from './SupremeCourtAgent';

interface DeepForensicRoomProps {
    scanId: string;
}

export default function DeepForensicRoom({ scanId }: DeepForensicRoomProps) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeepDive = async () => {
            try {
                const response = await fetch(`http://localhost:8000/scan/${scanId}/deep_dive`);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeepDive();
    }, [scanId]);

    if (loading) {
        return (
            <div className="w-full mt-8 p-12 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
                <div className="relative w-20 h-20">
                    <Disc className="absolute inset-0 text-blue-500 animate-spin opacity-50 w-full h-full" />
                    <Fingerprint className="absolute inset-0 text-purple-500 animate-pulse w-full h-full p-4" />
                </div>
                <p className="font-mono text-zinc-400 tracking-widest text-sm animate-pulse">ROUTING TO DEEP FORENSIC ROOM...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-8 p-6 lg:p-10 bg-zinc-950 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <ShieldAlert size={120} />
            </div>

            <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6 relative z-10">
                <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
                    <Fingerprint className="text-red-500" size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Phase 2: {data.feature}</h2>
                    <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold mt-1">Category Analysis: {data.phase2_category}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {Object.entries(data.results).map(([key, value], idx) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={key}
                        className="bg-zinc-900 border border-zinc-800/50 p-6 rounded-2xl flex items-start gap-4 hover:border-red-500/30 transition-colors group"
                    >
                        <div className="p-2 bg-zinc-950 rounded-lg group-hover:bg-red-500/10 transition-colors">
                            {typeof value === 'boolean' ? (
                                <AlertCircle size={20} className={value ? 'text-red-500' : 'text-green-500'} />
                            ) : typeof value === 'number' ? (
                                <Activity size={20} className="text-blue-500" />
                            ) : (
                                <Eye size={20} className="text-purple-500" />
                            )}
                        </div>
                        <div>
                            <p className="text-zinc-500 uppercase text-xs font-bold tracking-wider mb-2">{key.replace(/_/g, ' ')}</p>
                            {typeof value === 'boolean' ? (
                                <p className={`font-mono font-bold ${value ? 'text-red-400' : 'text-green-400'}`}>{value ? 'DETECTED' : 'CLEAR'}</p>
                            ) : typeof value === 'number' ? (
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-white">{value}</span>
                                    {value < 1 ? <span className="text-zinc-500 mb-1">/ 1.0 (Prob)</span> : <span className="text-zinc-500 mb-1">nodes/days</span>}
                                </div>
                            ) : (
                                <p className="text-zinc-300 font-medium leading-relaxed max-w-sm">{String(value)}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Hex/Grid visual flair */}
            <div className="mt-8 flex justify-center">
                <div className="inline-flex gap-2">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                            className="w-16 h-2 bg-red-500/50 rounded-full"
                        />
                    ))}
                </div>
            </div>

            <SupremeCourtAgent scanId={scanId} />
        </motion.div>
    );
}
