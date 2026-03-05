'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryARoom({ scanId }: { scanId: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-grow w-full mx-auto py-10 flex flex-col gap-10"
        >
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider w-fit border border-blue-500/20">
                        <span className="material-symbols-outlined text-[16px]">security</span>
                        Contextual Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Category A: <br className="md:hidden" /> Contextual Hijacks
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl font-medium">
                        (Real Media, Fake Story)
                    </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="material-symbols-outlined text-[18px]">update</span>
                        <span>Last updated: 2 mins ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Active Threat</span>
                    </div>
                </div>
            </header>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Traceback Visual */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Patient Zero Traceback Card */}
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined text-blue-500">hub</span>
                                Digital &quot;Patient Zero&quot; Traceback
                            </h3>
                            <button className="text-sm text-blue-500 font-medium hover:underline">View Full Report</button>
                        </div>

                        {/* Timeline Visual */}
                        <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-12">

                            {/* Original Seed */}
                            <div className="relative group">
                                <div className="absolute -left-[41px] top-0 p-2 bg-slate-900 border-2 border-green-500 rounded-full z-10 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl block">image</span>
                                </div>
                                <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-5 border border-slate-700/50 relative hover:border-green-500/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                                    <div className="absolute top-5 right-5 text-xs font-mono text-slate-400">ID: #IMG-2022-8X9</div>
                                    <div className="grid md:grid-cols-[120px_1fr] gap-6">
                                        <div className="aspect-square rounded-lg bg-cover bg-center shadow-inner" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADiDAqwGPFXrPHVFlafyujnbXJ3bcYFdvzBeAEvXgOEOaHZCM8YIEhs3EPcUqeTLVvNms6IqjGqOjbqmZM8ixlBht8pfUBa5pXj_vsVABqckTPfM2TC2eXBMWmRY7QB97YQIF3hNbXX5UkVghaGg241FxTmLXy0aVjGM8PaUn2qCM9yjkHKqa3KF-UhlfxpnO1DFQ3FBB2TGjbne_gF6h_Nogb9Et64xl8tUxcRM9iyn5DluCMEpcEZOuZH1E6v0suJ8S4Z2XcYw')" }}></div>
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-lg text-white">Seed Post: Vacation Photo</h4>
                                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">AUTHENTIC</span>
                                                </div>
                                                <p className="text-sm text-slate-300 mb-2">Original Source: Instagram • July 14, 2022</p>
                                                <p className="text-sm text-slate-300">
                                                    Metadata confirms location: <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded">38.9072° N, 1.4192° E (Ibiza)</span>.
                                                    Visual fingerprints match archival travel logs.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Connector Line Label */}
                            <div className="absolute left-8 top-[38%] -translate-y-1/2 flex items-center gap-2 opacity-60">
                                <div className="h-8 w-[2px] bg-gradient-to-b from-slate-200 to-red-500 dark:from-slate-800"></div>
                            </div>

                            {/* Mutation Event */}
                            <div className="relative group">
                                <div className="absolute -left-[41px] top-0 p-2 bg-slate-900 border-2 border-red-500 rounded-full z-10 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                    <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl block">warning</span>
                                </div>
                                <div className="bg-red-900/20 backdrop-blur-md rounded-lg p-5 border border-red-900/40 relative hover:border-red-500/50 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                                    <div className="absolute top-5 right-5 text-xs font-mono text-red-500 dark:text-red-400">ID: #{scanId.substring(0, 10).toUpperCase()}</div>
                                    <div className="grid md:grid-cols-[120px_1fr] gap-6">
                                        <div className="aspect-square rounded-lg bg-cover bg-center shadow-inner grayscale contrast-125" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwRgEY030XDuKmubdhJyAvDFcVRdrDMWvD-TOPjSLR40Zih2Ct-SMFbZlrBYsYsywzOZklP9QcTxq3yz2xjsLudreT3AuGnsreNMX-BPQJnUSphyoicY-CX7iOVb47pWhxxyvPLmppQ07NO31pj1tduLN9JJoLu--cdqgIhh6el47EEWbqQG_uwIhl2VmUVNWZk69Evo4C-0nKdMYOj77Fcq-2Nvo3vC5wp7nXqBqUK4E2wu5GE3n4KOJa4syoKwGvP-77U4074Q')" }}></div>
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-lg text-white">Mutation: &quot;War-zone&quot; Post</h4>
                                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">HIJACKED CONTEXT</span>
                                                </div>
                                                <p className="text-sm text-slate-300 mb-2">Flagged Source: X (Twitter) • Current Timeline</p>
                                                <p className="text-sm text-slate-300">
                                                    <span className="font-bold text-red-600 dark:text-red-400">Context Mismatch Detected.</span>
                                                    Image reposted with altered caption claiming active conflict zone. No pixel manipulation detected, but semantic context is 99% divergent from seed.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Viral Spread Chart */}
                    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h3 className="text-base font-bold text-white">Viral Spread Velocity</h3>
                                <p className="text-sm text-slate-300">Cross-platform re-share rate (post-mutation)</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-3xl font-black text-white">High</div>
                                    <div className="text-xs font-bold text-green-600 dark:text-green-400">+450% <span className="text-slate-400 font-normal">vs avg</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-48 w-full relative">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <line className="text-slate-500" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.2" x1="0" x2="100" y1="10" y2="10"></line>
                                <line className="text-slate-500" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.2" x1="0" x2="100" y1="25" y2="25"></line>
                                <line className="text-slate-500" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.2" x1="0" x2="100" y1="40" y2="40"></line>
                                <path d="M0 45 C 20 45, 30 40, 40 38 C 50 36, 60 10, 70 8 C 80 6, 90 5, 100 2" fill="none" stroke="#3b82f6" strokeLinecap="round" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path>
                                <path d="M0 45 C 20 45, 30 40, 40 38 C 50 36, 60 10, 70 8 C 80 6, 90 5, 100 2 V 50 H 0 Z" fill="url(#chartGradient)" opacity="0.2"></path>
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6"></stop>
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                                <span>T-Minus 24h</span>
                                <span>Mutation Event</span>
                                <span>Now</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Mechanism & Stats */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Mechanism Card */}
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 shadow-sm h-fit">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2 text-white">Mechanism</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                How VERITAS detected this hijack using Cross-Platform Graph Neural Networks (GNNs).
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                                <div className="mt-1 min-w-8">
                                    <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">Visual Fingerprinting</h4>
                                    <p className="text-xs text-slate-300 mt-1">
                                        GNN extracts invariant visual features from the seed image, ignoring compression artifacts.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                                <div className="mt-1 min-w-8">
                                    <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[20px]">dataset_linked</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">Metadata Analysis</h4>
                                    <p className="text-xs text-slate-300 mt-1">
                                        EXIF data discrepancies identified between original upload (2022) and current viral instance.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                                <div className="mt-1 min-w-8">
                                    <div className="size-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">Contextual Hijack Alert</h4>
                                    <p className="text-xs text-slate-300 mt-1">
                                        Semantic mismatch score: <span className="font-mono text-red-600 dark:text-red-400 font-bold">0.98</span>. New caption contradicts visual evidence.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                            <button className="w-full py-3 px-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Download Evidence Pack
                            </button>
                        </div>
                    </div>

                    {/* Small Stat Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Confidence Score</div>
                            <div className="text-2xl font-black text-blue-500">99.4%</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Impact Radius</div>
                            <div className="text-2xl font-black text-white">1.2M</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
