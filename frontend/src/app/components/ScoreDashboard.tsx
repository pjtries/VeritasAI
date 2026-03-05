'use client';

import React, { useState, useRef } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, Activity, Cpu, Database, Network, Upload, FileText, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DeepForensicRoom from './DeepForensicRoom';
import CategoryARoom from './CategoryARoom';
import CategoryBRoom from './CategoryBRoom';
import CategoryCRoom from './CategoryCRoom';
import Phase3Loop from './Phase3Loop';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, where } from 'firebase/firestore';

type RiskCategory = 'Contextual' | 'Synthetic' | 'Narrative' | 'Benign';

interface ScanResult {
  id: string;
  deception_score: number;
  category: RiskCategory;
  confidence: number;
  explanation_summary: string;
  routing_decision: string[];
  status: string;
}

interface HistoryItem {
  id: string;
  userId: string;
  scanId: string;
  deception_score: number;
  category: RiskCategory;
  status: string;
  explanation_summary: string;
  timestamp: unknown;
}

export default function ScoreDashboard() {
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showPhase2, setShowPhase2] = useState(false);
  const [showPhase3, setShowPhase3] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<RiskCategory | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, 'scans'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HistoryItem));
      setHistory(docs);
    } catch (e) {
      console.error("Error fetching history: ", e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startScan = async () => {
    if (!textContent.trim() && !selectedFile) return;

    setLoading(true);
    setResult(null);
    setShowPhase2(false);
    setActiveCategoryTab(null);
    try {
      const formData = new FormData();
      if (textContent.trim()) formData.append('text_content', textContent);
      if (selectedFile) formData.append('file', selectedFile);

      const response = await fetch('http://127.0.0.1:8000/scan', {
        method: 'POST',
        body: formData,
      });

      if (response && response.ok) {
        const data = await response.json();
        setResult(data);

        // Auto-trigger Phase 2 and Phase 3 for UI testing unconditionally
        setShowPhase2(true);
        setActiveCategoryTab(data.category === 'Benign' ? 'Contextual' : data.category);
        setShowPhase3(true);

        // Save to Firebase
        if (auth.currentUser) {
          await addDoc(collection(db, 'scans'), {
            userId: auth.currentUser.uid,
            scanId: data.id,
            deception_score: data.deception_score,
            category: data.category,
            status: data.status,
            explanation_summary: data.explanation_summary,
            timestamp: serverTimestamp()
          });
          fetchHistory();
        }
      } else {
        console.error("Backend error");
      }
    } catch (error) {
      console.error("Network error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getCategoryIcon = (category: RiskCategory) => {
    switch (category) {
      case 'Benign': return <CheckCircle className="text-green-500" size={24} />;
      case 'Synthetic': return <Cpu className="text-red-500" size={24} />;
      case 'Contextual': return <Network className="text-yellow-500" size={24} />;
      case 'Narrative': return <Database className="text-purple-500" size={24} />;
      default: return <Activity size={24} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">

      {!result && !loading && (
        <div className="text-center mb-10 max-w-2xl mx-auto pt-8">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
            Digital Autopsy
          </h2>
          <p className="text-lg text-slate-300 mx-auto max-w-lg font-light">
            Advanced multimodal semantic triage for deep forensic analysis. Upload assets to begin the sequence.
          </p>
        </div>
      )}

      <div className={`w-full mx-auto transition-all ${result || loading ? 'max-w-5xl' : 'max-w-2xl'}`}>
        <div className={`glass-panel rounded-2xl p-2 shadow-premium transition-all ${result || loading ? 'hidden' : 'block'}`}>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="mb-5 space-y-4">
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Source Input</label>
              <div className="relative group">
                <span className="absolute left-4 top-4 text-slate-400 pointer-events-none group-focus-within:text-slate-300 transition-colors">
                  <Network size={20} />
                </span>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="w-full bg-slate-950/50 border-[1px] border-slate-700/80 rounded-lg py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all font-medium min-h-[120px] resize-y shadow-inner backdrop-blur-sm"
                  placeholder="Paste suspicious text, URL, or raw transcript..."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-2">
                <div className="flex items-center w-full sm:w-auto flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/80 px-4 py-3 rounded-lg transition-all w-full sm:w-auto justify-center font-medium text-sm shadow-sm"
                  >
                    <Upload size={18} />
                    <span>Attach Image / Video</span>
                  </label>

                  {selectedFile && (
                    <div className="ml-4 flex items-center gap-2 text-sm bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-lg shadow-sm">
                      <FileText size={16} />
                      <span className="truncate max-w-[150px] font-medium">{selectedFile.name}</span>
                      <button onClick={removeFile} className="hover:text-emerald-200 ml-1 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={startScan}
              disabled={loading || (!textContent.trim() && !selectedFile)}
              className="w-full bg-blue-600 dark:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-500/50 hover:bg-blue-500 transition-all transform active:scale-[0.98] flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
            >
              <span className="tracking-widest text-sm uppercase">Initiate Autopsy</span>
              {loading ? (
                <Activity className="animate-spin text-white" size={20} />
              ) : (
                <Activity className="group-hover:translate-x-1 transition-transform text-blue-200 group-hover:text-white" size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {!history.length && !result && !loading && !showPhase3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass-panel rounded-3xl p-12 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
          <Search size={48} className="mx-auto text-slate-400 dark:text-slate-300 mb-6 group-hover:text-blue-500/50 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">Awaiting Target</h3>
          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            The VERITAS.ai triage pipeline is idle. Input a suspicious URL, clickbait text paragraph, or upload anomalous media to begin the initial autopsy and determine the manipulation vector.
          </p>
        </motion.div>
      )}
      {history.length > 0 && !result && !loading && !showPhase3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel border-none p-6 md:p-8 relative"
        >
          <div className="flex items-center gap-2 mb-6 text-slate-300">
            <Clock size={20} className="text-blue-500" />
            <h2 className="text-lg font-bold uppercase tracking-widest text-white">Recent Investigations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item, idx) => (
              <div key={idx} className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 font-mono">{item.scanId || 'UNKNOWN'}</span>
                  <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-md ${getScoreColor(item.deception_score).replace('text-', 'bg-')}/10 ${getScoreColor(item.deception_score)}`}>{item.category}</span>
                </div>
                <div className="flex items-end gap-2 text-white font-black text-2xl">
                  {item.deception_score} <span className="text-xs font-medium text-slate-500 mb-1">SCORE</span>
                </div>
                <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed font-medium">
                  {item.explanation_summary}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-16 space-y-6 bg-zinc-900/50 border border-zinc-800/50 rounded-3xl"
          >
            <div className="relative w-32 h-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-zinc-800 border-l-transparent rounded-full opacity-80"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 border-4 border-t-purple-500 border-r-transparent border-b-zinc-800 border-l-transparent rounded-full opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="text-zinc-400 animate-pulse" size={24} />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-white font-mono font-medium animate-pulse tracking-widest text-lg">PHASE 1: TRIAGE IN PROGRESS...</p>
              <p className="text-zinc-500 text-sm font-mono">Running Golden Prompt via Gemini. Extracting Embeddings.</p>
            </div>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-10 w-full"
          >
            {/* Page Header for Phase 1 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-emerald-100 dark:border-emerald-500/20">Active Analysis</span>
                  <span className="text-slate-400 text-sm font-mono">Session ID: #{result.id.substring(0, 8).toUpperCase()}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white">
                  Phase 1: Multimodal Semantic Triage
                </h1>
                <p className="text-slate-300 text-base font-normal max-w-2xl">
                  Real-time cross-referencing of semantic data layers across disparate media formats to detect synthetic manipulation.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Export Report
                </button>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Processing Vectors (Span 8) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Processing Vectors Section */}
                <section className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">hub</span>
                      Processing Vectors
                    </h3>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">REAL-TIME FEED</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Vector Card: Text */}
                    <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-700/50 p-5 shadow-sm group">
                      <div className="absolute top-0 right-0 p-3">
                        <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="p-2 w-fit rounded-lg bg-slate-800 text-slate-400">
                          <span className="material-symbols-outlined">description</span>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Source Layer</p>
                          <p className="text-white text-lg font-bold">Text Corpus</p>
                        </div>
                        <div className="mt-auto pt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-end">
                          <span className="text-xs text-slate-400">Confidence</span>
                          <span className="text-emerald-400 font-mono font-bold">+98%</span>
                        </div>
                      </div>
                    </div>

                    {/* Vector Card: Captions */}
                    <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-700/50 p-5 shadow-sm group">
                      <div className="absolute top-0 right-0 p-3">
                        <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="p-2 w-fit rounded-lg bg-slate-800 text-slate-400">
                          <span className="material-symbols-outlined">subtitles</span>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Source Layer</p>
                          <p className="text-white text-lg font-bold">Captions</p>
                        </div>
                        <div className="mt-auto pt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-end">
                          <span className="text-xs text-slate-400">Confidence</span>
                          <span className="text-emerald-400 font-mono font-bold">+95%</span>
                        </div>
                      </div>
                    </div>

                    {/* Vector Card: Video Audio */}
                    <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-700/50 p-5 shadow-sm group">
                      <div className="absolute top-0 right-0 p-3">
                        <div className="size-2 rounded-full bg-amber-500 animate-pulse"></div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="p-2 w-fit rounded-lg bg-slate-800 text-slate-400">
                          <span className="material-symbols-outlined">graphic_eq</span>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Source Layer</p>
                          <p className="text-white text-lg font-bold">Video Audio</p>
                        </div>
                        <div className="mt-auto pt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-end">
                          <span className="text-xs text-slate-400">Status</span>
                          <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">Scanning...</span>
                        </div>
                      </div>
                    </div>

                    {/* Vector Card: Hashtags */}
                    <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-700/50 p-5 shadow-sm group">
                      <div className="absolute top-0 right-0 p-3">
                        <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="p-2 w-fit rounded-lg bg-slate-800 text-slate-400">
                          <span className="material-symbols-outlined">tag</span>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Source Layer</p>
                          <p className="text-white text-lg font-bold">Hashtags</p>
                        </div>
                        <div className="mt-auto pt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-end">
                          <span className="text-xs text-slate-400">Confidence</span>
                          <span className="text-emerald-400 font-mono font-bold">+100%</span>
                        </div>
                      </div>
                    </div>

                    {/* Vector Card: User Comments */}
                    <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-700/50 p-5 shadow-sm group md:col-span-2">
                      <div className="absolute top-0 right-0 p-3">
                        <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                      </div>
                      <div className="flex flex-col gap-3 h-full">
                        <div className="flex items-center gap-3">
                          <div className="p-2 w-fit rounded-lg bg-slate-800 text-slate-400">
                            <span className="material-symbols-outlined">forum</span>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Source Layer</p>
                            <p className="text-white text-lg font-bold">User Comments</p>
                          </div>
                        </div>
                        <div className="mt-auto pt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                            <span className="text-xs text-slate-400">Parsing 2,403 threads</span>
                          </div>
                          <span className="text-primary font-mono font-bold">82% Processed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Detection Indicators Section */}
                <section className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-500">flag</span>
                      Detection Indicators
                    </h3>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">AI GEMINI INSIGHTS</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row items-stretch gap-4 rounded-xl bg-slate-900/50 border border-slate-700/50 p-1 shadow-sm overflow-hidden hover:border-primary/30 transition-colors">
                      <div className="w-full sm:w-16 bg-blue-500/10 dark:bg-blue-500/5 rounded-lg shrink-0 flex items-center justify-center p-4">
                        <span className="material-symbols-outlined text-blue-500 text-3xl">psychology</span>
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-white font-bold text-base">Gemini Analysis Summary</h4>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-1">{result.explanation_summary}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch gap-4 rounded-xl bg-slate-900/50 border border-slate-700/50 p-1 shadow-sm overflow-hidden hover:border-primary/30 transition-colors">
                      <div className="w-full sm:w-16 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0 flex items-center justify-center p-4">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-500 text-3xl">route</span>
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-white font-bold text-base">Routing Decision</h4>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-2">Automated system has flagged content routing to specialized forensic rooms.</p>
                        <div className="flex gap-2 text-xs font-mono font-bold text-indigo-500">
                          {result.routing_decision.map((r, i) => <span key={i} className="bg-indigo-500/10 px-2 py-1 rounded">[{r}]</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Triage Output (Span 4) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <section className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-500">gavel</span>
                      Triage Output
                    </h3>
                  </div>
                  <div className="flex-1 rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col gap-6 relative overflow-hidden backdrop-blur-sm">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {/* Deception Score */}
                    <div className="flex flex-col gap-2 items-center justify-center py-6 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="relative size-48">
                        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                          {/* Background Circle */}
                          <path className="text-slate-100 dark:text-slate-200" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                          {/* Progress Circle */}
                          <path className={`${getScoreColor(result.deception_score)} drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-1000 ease-out`} strokeWidth="2.5" strokeDasharray={`${result.deception_score}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <span className={`text-5xl font-black ${getScoreColor(result.deception_score)} tracking-tighter`}>{result.deception_score}%</span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Deception</span>
                        </div>
                      </div>
                      <p className="text-center text-sm text-slate-300 mt-2 px-4">
                        Likelihood of synthetic manipulation or coordinated inauthenticity.
                      </p>
                    </div>

                    {/* Risk Category */}
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Classification</span>
                      <div className="rounded-xl bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-4 flex items-start gap-4">
                        <div className={`mt-1 p-1 rounded text-white shrink-0 ${result.category === 'Benign' ? 'bg-green-500' : result.category === 'Contextual' ? 'bg-yellow-500' : result.category === 'Synthetic' ? 'bg-orange-500' : 'bg-red-500'}`}>
                          {getCategoryIcon(result.category)}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-base">Category: {result.category}</h4>
                          <p className="text-slate-300 font-medium text-sm">{result.status.toUpperCase()}</p>
                          <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                            {result.routing_decision.length > 0 ? "Content exhibits traits requiring advanced specialized forensic verification." : "Content passes baseline authentic thresholds. No deep forensics required."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action/Scroll Indicator */}
                    <div className="flex flex-col gap-3 mt-auto pt-4">
                      <div className="w-full py-3.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 font-bold text-sm flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px] animate-bounce">arrow_downward</span>
                        Scroll down to view Phase 2 & 3 forensic modules
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Deep Forensic Room Render */}
            <AnimatePresence mode="popLayout">
              {showPhase2 && (
                <motion.div
                  key="phase2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-12 flex flex-col gap-6"
                >
                  {/* View Tabs */}
                  <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl w-fit mx-auto shadow-inner backdrop-blur-sm z-20">
                    <button
                      onClick={() => setActiveCategoryTab('Contextual')}
                      className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategoryTab === 'Contextual' ? 'bg-slate-800 text-blue-400 shadow-md transform scale-105' : 'text-slate-400 hover:text-white dark:hover:text-white hover:bg-slate-800/50'}`}
                    >
                      Category A: Contextual
                    </button>
                    <button
                      onClick={() => setActiveCategoryTab('Synthetic')}
                      className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategoryTab === 'Synthetic' ? 'bg-slate-800 text-orange-400 shadow-md transform scale-105' : 'text-slate-400 hover:text-white dark:hover:text-white hover:bg-slate-800/50'}`}
                    >
                      Category B: Synthetic
                    </button>
                    <button
                      onClick={() => setActiveCategoryTab('Narrative')}
                      className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategoryTab === 'Narrative' ? 'bg-slate-800 text-emerald-400 shadow-md transform scale-105' : 'text-slate-400 hover:text-white dark:hover:text-white hover:bg-slate-800/50'}`}
                    >
                      Category C: Narrative
                    </button>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategoryTab}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeCategoryTab === 'Contextual' && <CategoryARoom scanId={result.id} />}
                      {activeCategoryTab === 'Synthetic' && <CategoryBRoom scanId={result.id} />}
                      {activeCategoryTab === 'Narrative' && <CategoryCRoom scanId={result.id} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}

              {showPhase3 && (
                <motion.div
                  key="phase3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Phase3Loop scanId={result.id} />
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
