'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryCRoom({ scanId }: { scanId: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-grow w-full mx-auto py-10 flex flex-col gap-10"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full w-fit">
                        <span className="material-symbols-outlined text-[16px]">shield</span>
                        Forensic Analysis
                    </div>
                    <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                        Category C: Coordinated Narrative
                    </h1>
                    <p className="text-slate-300 text-lg font-medium leading-normal">
                        Bot Farms &amp; Astroturfing Detection
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700/50 rounded-lg text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-sm shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-md shadow-blue-500/20">
                        <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        Run Live Scan
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI Card 1 */}
                <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Temporal Sync Score</p>
                        <span className="material-symbols-outlined text-blue-500 text-[20px]">schedule</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-2">94%</p>
                    <div className="flex items-center gap-1 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-500/10 border border-red-500/20 px-2 py-1 rounded w-fit">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        CRITICAL
                    </div>
                </div>

                {/* KPI Card 2 */}
                <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Semantic Collusion</p>
                        <span className="material-symbols-outlined text-blue-500 text-[20px]">forum</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-2">87%</p>
                    <div className="flex items-center gap-1 text-orange-500 text-xs font-bold bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded w-fit">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        High Risk
                    </div>
                </div>

                {/* KPI Card 3 */}
                <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Bot Probability</p>
                        <span className="material-symbols-outlined text-blue-500 text-[20px]">smart_toy</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-2">98.2%</p>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded w-fit">
                        Certainty
                    </div>
                </div>

                {/* KPI Card 4 */}
                <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Active Nodes</p>
                        <span className="material-symbols-outlined text-blue-500 text-[20px]">hub</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-2">1,402</p>
                    <div className="flex items-center gap-1 text-slate-300 text-xs font-bold bg-slate-800/50 px-2 py-1 rounded w-fit">
                        +342 Today
                    </div>
                </div>
            </div>

            {/* Main Visualization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Network Propagation Map (Large) */}
                <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <div>
                            <h3 className="text-lg font-bold text-white">Network Propagation Map</h3>
                            <p className="text-sm text-slate-300">Visualizing account clusters and propagation pathways</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Zoom In">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                            </button>
                            <button className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Zoom Out">
                                <span className="material-symbols-outlined text-[20px]">remove</span>
                            </button>
                            <button className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Fullscreen">
                                <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                            </button>
                        </div>
                    </div>
                    {/* Map Container */}
                    <div className="relative w-full h-[400px] bg-slate-950/50">
                        <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-multiply dark:mix-blend-lighten" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBGKB6BQ7jHwWt3QuXE46Dkhmz63mVSPZJCdNLn-Cio0vIoiO4bNpKjOYnUO5CVpBmsLsIlKzGyKmBK0Y-fpE7Cfu8TWfPXpF-Ql8z8A0gb6PYhdHSuqTkhVklEizARc8uQY4lAm3W27r5ie2mOz5ujzHuXb9g7KmjDfJSFU5-3qw1lS2Q42mxrHBZVh_aSQRrVM-9VUtoQCSvayvB5_w5RhVuoVburGPYZK3IH1MJkUSLv1BvEGtFbxh7lrvCKNWkaGqqpNMZpw')" }}></div>
                        {/* Overlay UI elements for the map */}
                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium shadow-lg hidden md:block">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                <span className="text-white">Bot Controller</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]"></span>
                                <span className="text-white">Amplifier Node</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                                <span className="text-white">Target Audience</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Entity Relationship Graph (Sidebar) */}
                <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col h-[480px]">
                    <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-white">Entity Relationships</h3>
                        <p className="text-sm text-slate-300">Controller to Influencer mapping</p>
                    </div>
                    <div className="p-4 flex-1 flex flex-col overflow-y-auto">
                        {/* Entity Item */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                                <span className="material-symbols-outlined text-[20px]">person_alert</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">@Freedom_Voice_99</p>
                                <p className="text-xs text-slate-300">Primary Controller</p>
                            </div>
                            <span className="text-xs font-bold text-red-500 uppercase">Hub</span>
                        </div>
                        {/* Connection Line */}
                        <div className="h-6 w-px border-l-2 border-dashed border-slate-300 dark:border-slate-700 ml-8 my-1"></div>
                        {/* Entity Item */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 ml-4">
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                <span className="material-symbols-outlined text-[16px]">campaign</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">@News_Flash_Daily</p>
                                <p className="text-xs text-slate-300">Amplifier (Tier 1)</p>
                            </div>
                        </div>
                        {/* Connection Line */}
                        <div className="h-6 w-px border-l-2 border-dashed border-slate-300 dark:border-slate-700 ml-12 my-1"></div>
                        {/* Entity Item */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 ml-8 mb-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                <span className="material-symbols-outlined text-[16px]">group</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">Bot Cluster #402</p>
                                <p className="text-xs text-slate-300">~450 Accounts</p>
                            </div>
                        </div>
                        {/* Button to see more */}
                        <button className="mt-auto w-full py-3 bg-slate-800/50 rounded-lg text-sm text-blue-600 dark:text-blue-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            View Full Graph
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Temporal Synchronization */}
                <div className="bg-slate-900/50 rounded-xl border border-slate-800 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Temporal Synchronization</h3>
                            <p className="text-sm text-slate-300">Simultaneous posting spikes (last 24h)</p>
                        </div>
                        <div className="flex items-center gap-1 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-2 py-1 rounded text-green-600 dark:text-green-400 text-sm font-bold">
                            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                            +450% Activity
                        </div>
                    </div>
                    <div className="h-48 w-full border-b border-l border-slate-200 dark:border-slate-700 relative">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                            <line stroke="currentColor" className="text-slate-200 dark:text-slate-300" strokeDasharray="2,2" x1="0" x2="100" y1="10" y2="10"></line>
                            <line stroke="currentColor" className="text-slate-200 dark:text-slate-300" strokeDasharray="2,2" x1="0" x2="100" y1="25" y2="25"></line>
                            <line stroke="currentColor" className="text-slate-200 dark:text-slate-300" strokeDasharray="2,2" x1="0" x2="100" y1="40" y2="40"></line>
                            <path d="M0 45 C 10 45, 10 30, 20 30 C 30 30, 30 40, 40 40 C 50 40, 50 10, 60 10 C 70 10, 70 35, 80 35 C 90 35, 95 45, 100 45" fill="none" stroke="#3b82f6" strokeLinecap="round" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path>
                            <path d="M0 45 C 10 45, 10 30, 20 30 C 30 30, 30 40, 40 40 C 50 40, 50 10, 60 10 C 70 10, 70 35, 80 35 C 90 35, 95 45, 100 45 V 50 H 0 Z" fill="url(#chartGradient2)" opacity="0.3"></path>
                            <circle cx="60" cy="10" r="1.5" fill="#3b82f6" stroke="white" strokeWidth="0.5" className="dark:stroke-slate-900"></circle>
                            <defs>
                                <linearGradient id="chartGradient2" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6"></stop>
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-slate-300 font-mono">
                        <span>00:00</span>
                        <span>04:00</span>
                        <span>08:00</span>
                        <span>12:00</span>
                        <span>16:00</span>
                        <span>20:00</span>
                    </div>
                </div>

                {/* Semantic Collusion */}
                <div className="bg-slate-900/50 rounded-xl border border-slate-800 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-white mb-1">Semantic Collusion</h3>
                    <p className="text-sm text-slate-300 mb-6">Recurring phraseology across clusters</p>

                    <div className="space-y-3">
                        {/* Item 1 */}
                        <div className="group flex items-start justify-between p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors cursor-pointer">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <span className="material-symbols-outlined text-blue-500">repeat</span>
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">&quot;The truth they hide...&quot;</p>
                                    <p className="text-xs text-slate-300 mt-1">Matches 892 accounts</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-500 text-sm">98% Match</p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="group flex items-start justify-between p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors cursor-pointer">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <span className="material-symbols-outlined text-blue-500">tag</span>
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">#WakeUpNow</p>
                                    <p className="text-xs text-slate-300 mt-1">Velocity: 120 posts/min</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-500 text-sm">High Velocity</p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="group flex items-start justify-between p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-red-500/50 transition-colors cursor-pointer">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <span className="material-symbols-outlined text-red-500">link</span>
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">bit.ly/news-leak-source</p>
                                    <p className="text-xs text-slate-300 mt-1">Shared by 4 clusters</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-red-500 text-sm">Malicious</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
