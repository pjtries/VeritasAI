'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Wand2, Frame, RefreshCcw, AlertCircle } from 'lucide-react';

interface FirewallLayerProps {
    scanId: string;
}

export default function FirewallLayer({ scanId }: FirewallLayerProps) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);

    const triggerReconstruction = async () => {
        setLoading(true);
        setInitiated(true);
        try {
            const response = await fetch(`http://localhost:8000/scan/${scanId}/firewall_reconstruction`, {
                method: 'POST',
            });
            if (response.ok) {
                const json = await response.json();
                setData(json);
            }
        } catch (err) {
            console.error(err);
        } finally {
            // simulate complex reconstruction
            setTimeout(() => setLoading(false), 2000);
        }
    };

    return (
        <div className="w-full mt-10 flex flex-col items-center">
            {!initiated && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full bg-zinc-950 border border-emerald-900/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                            <Shield className="text-emerald-500" size={32} />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-xl flex items-center gap-2">
                                Phase 4: The Firewall <span className="text-zinc-500 text-sm font-medium">| Reconstruction Layer</span>
                            </h3>
                            <p className="text-emerald-200/60 text-sm max-w-lg mt-1">
                                Has the content been poisoned? Initiate the <strong>Inverse Diffusion Engine (InstantViR)</strong> to revert the asset back to its unmanipulated truth baseline.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={triggerReconstruction}
                        className="shrink-0 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:border-emerald-400 px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center gap-3 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                    >
                        <Wand2 className="animate-pulse" size={20} />
                        Revert to Truth
                    </button>
                </motion.div>
            )}

            {loading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-zinc-900 border border-emerald-900/50 rounded-3xl p-12 flex flex-col items-center justify-center space-y-6 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent animate-pulse"></div>

                    <div className="relative w-28 h-28 grid place-items-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 border-4 border-dashed border-emerald-500/40 rounded-full"
                        ></motion.div>
                        <RefreshCcw size={40} className="text-emerald-400 animate-spin opacity-80" />
                        <Frame size={60} className="text-emerald-500 absolute mix-blend-overlay" />
                    </div>

                    <div className="text-center relative z-10 space-y-2">
                        <h3 className="text-xl font-black text-emerald-400 tracking-widest uppercase shadow-emerald-500 drop-shadow-md">
                            Inverse Diffusion Active
                        </h3>
                        <p className="text-emerald-200/50 text-sm max-w-sm mx-auto font-mono">
                            Running InstantViR student model... Stripping generator artifacts and mapping back to ground truth representation.
                        </p>
                    </div>
                </motion.div>
            )}

            {data && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-zinc-950 border-2 border-emerald-500/40 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                    <div className="p-8 border-b border-emerald-900/40 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                                <Sparkles className="text-emerald-400" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">Truth Reconstructed</h2>
                                <p className="text-emerald-500 uppercase tracking-widest text-xs font-bold mt-1">
                                    {data.inverse_diffusion_model}
                                </p>
                            </div>
                        </div>
                        <div className="text-right flex space-x-4">
                            <div>
                                <p className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Reconstruction Latency</p>
                                <p className="text-emerald-400 font-mono font-bold text-xl">{data.latency_ms}ms</p>
                            </div>
                            <div>
                                <p className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Confidence Label</p>
                                <p className="text-emerald-400 font-mono font-bold text-xl">{(data.reconstruction_confidence * 100).toFixed(1)}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Fake state (simulated) */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-rose-900/30 pb-2">
                                <h4 className="text-rose-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Shield size={16} className="text-rose-500" />
                                    Manipulated Payload
                                </h4>
                                <span className="bg-rose-500/20 text-rose-500 text-[10px] px-2 py-0.5 rounded font-bold tracking-wider">REDACTED</span>
                            </div>
                            <div className="aspect-video bg-zinc-900 rounded-2xl border border-rose-500/20 overflow-hidden relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-red-500/10 mix-blend-color animate-pulse pointer-events-none"></div>
                                <AlertCircle size={48} className="text-rose-500/30" />
                                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded flex items-center gap-2 border border-rose-500/30">
                                    <Shield size={14} className="text-rose-400" />
                                    <span className="text-rose-200 text-xs font-mono">Deceptive Trace Detected</span>
                                </div>
                            </div>
                        </div>

                        {/* Truth state */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-emerald-900/30 pb-2">
                                <h4 className="text-emerald-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Sparkles size={16} className="text-emerald-500" />
                                    Baseline Core
                                </h4>
                                <span className="bg-emerald-500/20 text-emerald-500 text-[10px] px-2 py-0.5 rounded font-bold tracking-wider">CLEAN</span>
                            </div>
                            <div className="aspect-video bg-zinc-900 rounded-2xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)] overflow-hidden relative flex items-center justify-center group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity"></div>
                                <Frame size={48} className="text-emerald-500/40" />

                                {/* Scanline effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

                                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded flex items-center gap-2 border border-emerald-500/30">
                                    <Sparkles size={14} className="text-emerald-400" />
                                    <span className="text-emerald-200 text-xs font-mono">{data.status_message}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-950/50 border-t border-emerald-900/50 p-6 px-8 flex items-center gap-4 text-emerald-300">
                        <div className="bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-xs font-bold uppercase shrink-0">
                            Action Log
                        </div>
                        <p className="text-sm font-medium tracking-wide">
                            {data.revert_action}
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
