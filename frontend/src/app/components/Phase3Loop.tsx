'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Phase3Loop({ scanId }: { scanId: string }) {
    const [learningRate, setLearningRate] = useState(65);
    const [decayRate, setDecayRate] = useState(85);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-grow w-full mx-auto py-10 flex flex-col gap-10"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-500/10 px-3 py-1 rounded-full w-fit border border-purple-200 dark:border-purple-500/20">
                        <span className="material-symbols-outlined text-[16px]">sync_problem</span>
                        Supreme Court Agent
                    </div>
                    <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                        Phase 3: Self-Correction Loop
                    </h1>
                    <p className="text-slate-300 text-lg font-medium max-w-2xl">
                        Analyze historical failures and real-time ground truth inputs to dynamically adjust agent weights.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 md:items-center">
                    <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 px-3 py-1.5 rounded-lg text-sm text-slate-400 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        System: ACTIVE
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-white rounded-lg hover:opacity-90 transition-opacity font-bold text-sm shadow-md">
                        <span className="material-symbols-outlined text-[18px]">publish</span>
                        Commit Adjustments
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Failure Analysis Terminal & Ground Truth */}
                <div className="lg:col-span-7 flex flex-col gap-6">

                    {/* Ground Truth Input Zone */}
                    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col h-64">
                        <div className="p-4 bg-slate-900/40 border-b border-slate-700/50">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-[20px]">fact_check</span>
                                Ground Truth Override
                            </h3>
                            <span className="text-xs text-slate-500 font-mono">Input labeled data</span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col gap-4">
                            <textarea
                                placeholder="Paste verified context or trusted source data here..."
                                className="w-full flex-1 bg-slate-950/50 border border-slate-700/50 rounded-lg p-3 text-sm text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            ></textarea>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Attach Source Document">
                                        <span className="material-symbols-outlined text-[20px]">attachment</span>
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Verify via API">
                                        <span className="material-symbols-outlined text-[20px]">api</span>
                                    </button>
                                </div>
                                <button className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm font-bold hover:bg-blue-500 hover:text-white transition-colors">
                                    Submit for Re-evaluation
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Failure Analysis Terminal */}
                    <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-sm overflow-hidden flex flex-col flex-1 min-h-[400px]">
                        <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                </div>
                                <h3 className="text-xs font-mono text-slate-400 font-bold tracking-widest uppercase ml-2">Failure Analysis Agent</h3>
                            </div>
                            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Connected
                            </span>
                        </div>
                        <div className="p-5 flex-1 overflow-y-auto font-mono text-sm space-y-4 bg-[#0a0f1c] shadow-inner">
                            <div className="text-slate-400">Initializing retrospective analysis on recent misclassifications...</div>
                            <div className="text-blue-400">Loading cases where [Confidence &gt; 90%] AND [GroundTruth == FALSE]...</div>

                            {/* Event 1 */}
                            <div className={`p-3 rounded border transition-colors mt-4 ${learningRate >= 80 ? 'bg-green-900/20 border-green-800' : 'bg-slate-900 border-slate-800'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`${learningRate >= 80 ? 'text-green-400' : 'text-red-400'} font-bold`}>CASE #8892 {learningRate >= 80 && '(RESOLVED)'}</span>
                                    <span className="text-slate-500 text-xs">Aug 12, 14:32</span>
                                </div>
                                <div className="text-slate-300">Target Type: Contextual Hijack (Phase 2A)</div>
                                <div className="text-slate-400 mt-2">
                                    Initial Score: <span className="text-red-400 line-through">94%</span> <br />
                                    Ground Truth: <span className="text-green-400">Authentic satire (Benign)</span>
                                </div>
                                <div className="mt-3 text-orange-400 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] mt-0.5">troubleshoot</span>
                                    Root Cause: Satire detector weight too low.
                                </div>
                                {learningRate < 80 ? (
                                    <div className="mt-2 text-blue-400 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">build</span>
                                        Suggested Action: Increase Satire Awareness Weight by +0.15
                                    </div>
                                ) : (
                                    <div className="mt-2 text-green-400 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        Weight Adjusted. Model re-calibrated.
                                    </div>
                                )}
                            </div>

                            {/* Event 2 */}
                            <div className={`p-3 rounded border transition-colors mt-2 ${decayRate >= 95 ? 'bg-green-900/20 border-green-800' : 'bg-slate-900 border-slate-800'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`${decayRate >= 95 ? 'text-green-400' : 'text-amber-400'} font-bold`}>CASE #9014 {decayRate >= 95 && '(RESOLVED)'}</span>
                                    <span className="text-slate-500 text-xs">Aug 12, 16:05</span>
                                </div>
                                <div className="text-slate-300">Target Type: Synthetic Audio Detection (Phase 1)</div>
                                <div className="text-slate-400 mt-2">
                                    Initial Score: <span className="text-amber-400">45% (Ambiguous)</span> <br />
                                    Ground Truth: <span className="text-purple-400">AI Generated (Deepfake)</span>
                                </div>
                                <div className="mt-3 text-orange-400 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] mt-0.5">troubleshoot</span>
                                    Root Cause: Background noise masking threshold too permissive. Voice cloning artifacts missed.
                                </div>
                                {decayRate < 95 ? (
                                    <div className="mt-2 text-indigo-400 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">build</span>
                                        Suggested Action: Increase Audio Artifact Sensitivity by +0.10
                                    </div>
                                ) : (
                                    <div className="mt-2 text-green-400 flex items-center gap-2 pl-6">
                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        Artifact Sensitivity Increased.
                                    </div>
                                )}
                            </div>
                            <div className="text-slate-500 mt-4 animate-pulse">Waiting for new input...</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-6 max-h-fit">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-500">tune</span>
                                    Dynamic Weight Adjustment
                                </h3>
                                <p className="text-sm text-slate-300 mt-1">Calibrate neural pathway influence</p>
                            </div>
                            <button className="text-sm text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                                Reset Defaults
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Slider 1 */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-300 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-green-500 text-[18px]">theater_comedy</span>
                                        Satire Awareness Offset
                                    </span>
                                    <span className="font-mono text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{learningRate / 100}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={learningRate}
                                    onChange={(e) => setLearningRate(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Aggressive Penalty</span>
                                    <span>High Tolerance</span>
                                </div>
                            </div>

                            {/* Slider 2 */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-300 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-orange-500 text-[18px]">graphic_eq</span>
                                        Audio Artifact Sensitivity
                                    </span>
                                    <span className="font-mono text-purple-500 font-bold bg-purple-50 dark:bg-purple-500/10 px-2 py-0.5 rounded">{decayRate / 100}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={decayRate}
                                    onChange={(e) => setDecayRate(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                />
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Permissive</span>
                                    <span>Strict</span>
                                </div>
                            </div>

                            {/* Readonly Metric */}
                            <div className="space-y-2 p-3 rounded-lg bg-slate-950/40 border border-slate-700/50">
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-bold text-slate-300">Historical Reliability Index</span>
                                    <span className="font-mono text-emerald-500 font-bold">0.962</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '96.2%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg p-4 flex gap-3">
                                <span className="material-symbols-outlined text-amber-500 shrink-0">info</span>
                                <p className="text-amber-800 dark:text-amber-400 text-xs leading-relaxed font-medium">
                                    Modifying these weights will immediately affect Phase 1 &amp; Phase 2 classification protocols globally. Ensure changes are supported by the Failure Analysis log before committing.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}
