'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, Scale, AlertOctagon, FileCheck2, Zap, BrainCircuit, Activity } from 'lucide-react';
import FirewallLayer from './FirewallLayer';

interface SupremeCourtAgentProps {
    scanId: string;
}

export default function SupremeCourtAgent({ scanId }: SupremeCourtAgentProps) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);

    const fetchJudgment = async () => {
        setLoading(true);
        setInitiated(true);
        try {
            const response = await fetch(`http://localhost:8000/scan/${scanId}/supreme_court`, {
                method: 'POST',
            });
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

    return (
        <div className="w-full mt-8 flex flex-col items-center">
            {!initiated && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={fetchJudgment}
                    className="bg-fuchsia-600/10 hover:bg-fuchsia-600/20 text-fuchsia-500 border border-fuchsia-500/50 hover:border-fuchsia-500 px-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(217,70,239,0.2)] hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent group-hover:translate-x-full duration-1000 transition-transform -translate-x-full"></div>
                    <Scale className="animate-pulse" />
                    Escalate to Phase 3: Supreme Court AI
                </motion.button>
            )}

            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full mt-4 p-12 bg-zinc-950 border border-fuchsia-900/50 rounded-3xl flex flex-col items-center justify-center space-y-6 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-fuchsia-500/5 animate-pulse"></div>
                    <div className="relative w-24 h-24">
                        <BrainCircuit className="absolute inset-0 text-fuchsia-500 animate-pulse w-full h-full p-2" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 border-4 border-dashed border-fuchsia-500/30 rounded-full"
                        ></motion.div>
                    </div>
                    <div className="text-center space-y-2 relative z-10">
                        <p className="font-mono text-fuchsia-400 tracking-widest text-lg font-bold uppercase shadow-fuchsia-500 drop-shadow-lg">
                            Correlating Evidence Streams...
                        </p>
                        <p className="text-zinc-500 text-sm">LLM reasoning layer analyzing conflict models.</p>
                    </div>
                </motion.div>
            )}

            {data && !loading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full mt-4 bg-zinc-950 border-2 border-fuchsia-900/50 rounded-3xl overflow-hidden shadow-2xl relative"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-fuchsia-900/40 to-transparent p-6 lg:p-8 flex items-center gap-6 border-b border-fuchsia-900/50 relative">
                        <div className="bg-fuchsia-500/20 p-4 rounded-2xl border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                            <Gavel className="text-fuchsia-400" size={40} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                Supreme Court Verdict
                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest ml-2
                    ${data.verdict === 'manipulated' ? 'bg-red-500/20 border border-red-500 text-red-400' :
                                        data.verdict === 'authentic' ? 'bg-green-500/20 border border-green-500 text-green-400' :
                                            'bg-yellow-500/20 border border-yellow-500 text-yellow-500'}`}
                                >
                                    {data.verdict}
                                </span>
                            </h2>
                            <p className="text-fuchsia-200/50 uppercase tracking-widest text-xs font-bold mt-2">
                                Reasoning Layer: LLM Conflict Resolution
                            </p>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Reasoning Log */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                                <div className="flex items-center gap-2 mb-4 text-fuchsia-400">
                                    <FileCheck2 size={20} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Judicial Reasoning Log</h3>
                                </div>
                                <p className="text-zinc-300 leading-relaxed text-sm font-medium">
                                    {data.reasoning_log}
                                </p>
                            </div>

                            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                                <div className="flex items-center gap-2 mb-4 text-orange-400">
                                    <Activity size={20} />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Audit Trail & Calibration</h3>
                                </div>
                                <p className="text-zinc-400 leading-relaxed text-sm font-mono tracking-tight bg-black/40 p-4 rounded-lg">
                                    {data.audit_trail}
                                </p>
                            </div>
                        </div>

                        {/* Details sidebar */}
                        <div className="space-y-6 flex flex-col justify-between">
                            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 flex flex-col items-center justify-center text-center">
                                <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-4">Confidence Calibration</p>
                                <div className="text-6xl font-black tracking-tighter text-white">
                                    {(data.confidence_calibration * 100).toFixed(1)}%
                                </div>
                                <div className="w-full bg-zinc-800 rounded-full h-2 mt-4">
                                    <div
                                        className="bg-gradient-to-r from-fuchsia-600 to-purple-500 h-2 rounded-full"
                                        style={{ width: `${data.confidence_calibration * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 border-l-4 border-l-red-500 shadow-inner">
                                <div className="flex items-center gap-2 mb-2 text-red-500">
                                    <AlertOctagon size={16} />
                                    <h3 className="font-bold text-xs uppercase tracking-wider">Evidence Heatmap Target</h3>
                                </div>
                                <p className="text-white font-semibold flex items-center gap-2">
                                    <Zap size={16} className="text-red-500/50" />
                                    {data.evidence_heatmap}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {data && data.verdict === 'manipulated' && (
                <FirewallLayer scanId={scanId} />
            )}
        </div>
    );
}
