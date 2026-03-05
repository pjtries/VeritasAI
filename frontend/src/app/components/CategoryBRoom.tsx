'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryBRoom({ scanId }: { scanId: string }) {
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
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                        ANALYSIS ACTIVE <span className="text-slate-500 ml-2 font-mono">ID: #SYN-892-X</span>
                    </div>
                    <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                        Category B: Synthetic
                        <br /> Generation
                    </h1>
                    <p className="text-slate-300 text-lg font-medium">
                        Deepfakes & AI Art Detection Suite
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        Settings
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-blue-500">hub</span>
                    The Forensic Trifecta
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Span-2 Card (Frequency Domain) */}
                    <div className="md:col-span-2 bg-slate-900/50 rounded-xl border border-slate-700/50 p-6 flex flex-col md:flex-row gap-8 shadow-sm">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-white mb-2">
                                <span className="material-symbols-outlined text-blue-500 text-xl">graphic_eq</span>
                                Frequency Domain Anomalies
                            </h3>
                            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                                Detecting high-frequency noise artifacts typical of GAN and Diffusion model upsampling.
                            </p>

                            <div className="bg-red-900/10 border border-red-900/40 rounded-lg p-5 mb-6 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                                <span className="text-[10px] font-bold text-red-500 tracking-wider uppercase bg-red-900/50 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(239,68,68,0.4)]">STATUS: DETECTED</span>
                                <h4 className="text-xl font-bold text-white mt-2 mb-1">High-Frequency Noise</h4>
                                <div className="flex items-center gap-2 text-red-500 text-sm font-bold mt-2">
                                    <span className="material-symbols-outlined">trending_up</span>
                                    +15% Deviation above organic baseline
                                </div>
                            </div>

                            <div className="flex gap-10">
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">SAMPLE RATE</div>
                                    <div className="font-mono text-white font-medium">44.1 kHz</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">ALGORITHM</div>
                                    <div className="font-mono text-white font-medium">Fast Fourier<br />Transform</div>
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-[1.5] border-l border-slate-100 dark:border-slate-800 pl-8 relative flex flex-col">
                            <div className="absolute top-0 right-0 flex items-center gap-2 text-xs font-bold text-blue-500 bg-blue-900/20 px-2 py-1 rounded">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                LIVE ANALYSIS
                            </div>
                            <div className="flex-1 mt-10 relative">
                                <svg className="w-full h-48 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                                    {/* Grid Lines */}
                                    <line stroke="currentColor" className="text-slate-200 dark:text-slate-200" strokeWidth="0.5" x1="0" x2="100" y1="12.5" y2="12.5"></line>
                                    <line stroke="currentColor" className="text-slate-200 dark:text-slate-200" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25"></line>
                                    <line stroke="currentColor" className="text-slate-200 dark:text-slate-200" strokeWidth="0.5" x1="0" x2="100" y1="37.5" y2="37.5"></line>
                                    <line stroke="currentColor" className="text-slate-200 dark:text-slate-200" strokeWidth="0.5" x1="0" x2="100" y1="50" y2="50"></line>

                                    {/* Organic Baseline Area */}
                                    <path d="M0 45 L 10 42 L 20 45 L 30 35 L 40 40 L 50 25 L 60 20 L 70 30 L 80 22 L 90 28 L 100 15 V 50 H 0 Z" fill="url(#organicBg)" opacity="0.3"></path>
                                    <path d="M0 45 L 10 42 L 20 45 L 30 35 L 40 40 L 50 25 L 60 20 L 70 30 L 80 22 L 90 28 L 100 15" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5" vectorEffect="non-scaling-stroke"></path>

                                    {/* Detected Noise Area (Red deviation) */}
                                    <path d="M60 20 L 70 15 L 80 22 L 90 12 L 100 15" fill="none" stroke="#ef4444" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path>
                                    <path d="M60 20 L 70 15 L 80 22 L 90 12 L 100 15 L 100 15 L 90 28 L 80 22 L 70 30 Z" fill="#ef4444" opacity="0.2"></path>

                                    <circle cx="60" cy="20" r="1.5" fill="#ef4444"></circle>
                                    <circle cx="70" cy="15" r="1.5" fill="#ef4444"></circle>
                                    <circle cx="90" cy="12" r="1.5" fill="#ef4444"></circle>

                                    <defs>
                                        <linearGradient id="organicBg" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6"></stop>
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
                                    <span>0Hz</span>
                                    <span>100Hz</span>
                                    <span>500Hz</span>
                                    <span>1kHz</span>
                                    <span>5kHz</span>
                                    <span>10kHz+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left Bottom Card (Optical Flow) */}
                    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined text-blue-500">blur_on</span>
                                Optical Flow Consistency
                            </h3>
                            <span className="bg-green-900/30 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide border border-green-200 dark:border-green-800">
                                PASS
                            </span>
                        </div>

                        <div className="w-full h-48 bg-slate-800 dark:bg-black rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
                            {/* Simple wireframe face simulation using SVG */}
                            <svg className="w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                                <path d="M 30,50 Q 30,70 50,85 Q 70,70 70,50 Q 70,30 50,20 Q 30,30 30,50 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" />
                                <path d="M 20,50 Q 20,80 50,95 Q 80,80 80,50 Q 80,20 50,10 Q 20,20 20,50 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1,3" />
                                {/* Horizontal grid across face */}
                                {[20, 30, 40, 50, 60, 70, 80].map(y => <line key={y} x1="10" x2="90" y1={y} y2={y} stroke="#3b82f6" strokeWidth="0.2" opacity="0.5" />)}
                                {/* Vertical grid across face */}
                                {[30, 40, 50, 60, 70].map(x => <line key={x} x1={x} x2={x} y1="10" y2="90" stroke="#3b82f6" strokeWidth="0.2" opacity="0.5" />)}
                                {/* Eyes */}
                                <ellipse cx="38" cy="45" rx="5" ry="3" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                                <ellipse cx="62" cy="45" rx="5" ry="3" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                            </svg>
                            {/* Heatmap overlay spot */}
                            <div className="absolute right-1/4 top-1/2 w-16 h-16 bg-red-500/20 blur-xl rounded-full"></div>

                            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded">
                                Frame: 204/1920
                            </div>
                        </div>

                        <p className="text-sm text-slate-300 mb-6 leading-relaxed flex-1">
                            Heatmap analysis of micro-warping in pixel-movement between frames.
                        </p>

                        <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Coherence Score</div>
                                <div className="text-lg font-black text-green-500">98.4%</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Warping Detected</div>
                                <div className="text-lg font-bold text-white">None</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Bottom Card (Specular Physics) */}
                    <div className="bg-slate-900/50 rounded-xl border border-slate-700/50 p-6 flex flex-col shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined text-blue-500">light_mode</span>
                                Specular Physics
                            </h3>
                            <span className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide border border-orange-200 dark:border-orange-800">
                                WARNING
                            </span>
                        </div>

                        <div className="w-full h-48 bg-slate-900 dark:bg-slate-950 rounded-lg mb-4 relative overflow-hidden">
                            {/* Grid background */}
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.3 }}></div>

                            {/* Vector visualizer */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Outer ring */}
                                <div className="w-32 h-32 rounded-full border border-blue-500/30 flex items-center justify-center relative">
                                    <div className="w-full h-full rounded-full border-t-2 border-r-2 border-blue-500/20 absolute -rotate-45"></div>
                                    <div className="w-2 h-2 bg-white rounded-full z-10 shadow-[0_0_10px_white]"></div>

                                    {/* The blue correct vector */}
                                    <div className="absolute top-1/2 left-1/2 w-48 h-0.5 bg-blue-500 -translate-y-1/2 -translate-x-1/2 -rotate-12 bg-opacity-70"></div>

                                    {/* The red mismatch vector */}
                                    <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-red-500 -translate-y-1/2 origin-left rotate-[-45deg]">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute -right-0.5 -top-0.5 shadow-[0_0_8px_#ef4444]"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 text-right">
                                <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-black/60 px-1 rounded inline-block mb-1">Vector Mismatch</div>
                                <div className="text-2xl font-black text-white">23°</div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 ml-8 -mt-8 bg-black/60 rounded px-1.5 py-0.5 flex items-center gap-1 border border-slate-700 pointer-events-none">
                                <span className="text-[10px] text-slate-300 font-mono">R.Eye</span>
                            </div>
                        </div>

                        <p className="text-sm text-slate-300 mb-6 leading-relaxed flex-1">
                            Analysis of 3D light reflection vectors on eyes and glasses.
                        </p>

                        <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Light Source Est.</div>
                                <div className="text-sm font-bold text-white">2 Sources</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vector Consistency</div>
                                <div className="text-sm font-bold text-orange-500">Low (Flagged)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
