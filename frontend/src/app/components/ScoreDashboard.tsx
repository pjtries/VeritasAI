'use client';

import React, { useState, useRef } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, Activity, Cpu, Database, Network, Upload, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DeepForensicRoom from './DeepForensicRoom';

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

export default function ScoreDashboard() {
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showPhase2, setShowPhase2] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    try {
      const formData = new FormData();
      if (textContent.trim()) formData.append('text_content', textContent);
      if (selectedFile) formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/scan', {
        method: 'POST',
        body: formData,
      });

      if (response && response.ok) {
        const data = await response.json();
        setResult(data);
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
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600"></div>

        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-blue-500 animate-pulse" size={36} />
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
              VERITAS.ai <span className="text-blue-500 text-sm font-bold bg-blue-500/10 px-2 py-1 rounded-md">MVP</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Sovereign Multimodal Triage Pipeline</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste suspicious text, clickbait caption, URL, or raw transcript..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all min-h-[120px] resize-y placeholder:text-zinc-600"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center w-full md:w-auto">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center gap-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
              >
                <Upload size={18} />
                <span className="text-sm font-medium">Attach Image / Audio / Video</span>
              </label>

              {selectedFile && (
                <div className="ml-4 flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg">
                  <FileText size={16} />
                  <span className="truncate max-w-[150px]">{selectedFile.name}</span>
                  <button onClick={removeFile} className="hover:text-red-400 ml-1">
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={startScan}
              disabled={loading || (!textContent.trim() && !selectedFile)}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:shadow-none"
            >
              {loading ? <Activity className="animate-spin" size={20} /> : (
                <>
                  <Search size={20} />
                  Initiate Autopsy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

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
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl relative overflow-hidden group">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${getScoreColor(result.deception_score).replace('text-', 'bg-')}`}></div>
                <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Deception Score</p>
                <div className={`text-8xl font-black tracking-tighter ${getScoreColor(result.deception_score)} drop-shadow-lg`}>
                  {result.deception_score}
                </div>
                <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
                  <Activity size={14} className="text-blue-500" />
                  <p className="text-zinc-400 text-xs font-medium">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                </div>
              </div>

              {/* Category Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 shadow-xl">
                <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Risk Category</p>
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                  {getCategoryIcon(result.category)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{result.category}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{result.status.toUpperCase()}</p>
                </div>
              </div>

              {/* Routing Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col shadow-xl">
                <div className="flex items-center gap-2 mb-6 text-blue-500 border-b border-zinc-800 pb-4">
                  <AlertTriangle size={20} />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Dynamic Risk Routing</h3>
                </div>
                {result.routing_decision.length > 0 ? (
                  <div className="space-y-3 flex-1 flex flex-col justify-center">
                    {result.routing_decision.map((tool, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        key={i}
                        className="flex items-center gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors"
                      >
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                        <span className="text-zinc-200 text-sm font-semibold">{tool}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center py-6 text-zinc-500 italic text-sm">
                    No forensic escalation required. Content is safe.
                  </div>
                )}
              </div>
            </div>

            {/* AI Explanation Bar */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-300 shadow-xl flex items-start gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 shrink-0 mt-1">
                <Search className="text-blue-500" size={20} />
              </div>
              <div>
                <h4 className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-2">Gemini Analysis</h4>
                <p className="text-sm leading-relaxed">{result.explanation_summary}</p>
              </div>
            </div>

            {/* System Logs */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 font-mono text-[11px] text-zinc-600 space-y-1.5 shadow-inner">
              <p className="mb-2 uppercase tracking-tighter text-zinc-500 font-bold">Forensic Trace Logs</p>
              <p><span className="text-blue-500/50">&gt;</span> [id:{result.id}] Initialized semantic triage protocol...</p>
              <p><span className="text-blue-500/50">&gt;</span> Feature embedding extraction: ALL-MINILM-L6-V2 [SUCCESS]</p>
              <p><span className="text-blue-500/50">&gt;</span> GenAI reasoning engine correlation: GEMINI-2.5-FLASH [SUCCESS]</p>
              <p><span className="text-purple-500/50">&gt;</span> Assigned deception score: {result.deception_score}/100</p>
              <p><span className="text-yellow-500/50">&gt;</span> Identified threat vector: {result.category}</p>
              <p><span className="text-green-500/50">&gt;</span> Routed to {result.routing_decision.length} forensic rooms.</p>
            </div>

            {/* Phase 2 Escalation Trigger */}
            {result.routing_decision.length > 0 && !showPhase2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center pt-4"
              >
                <button
                  onClick={() => setShowPhase2(true)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 hover:border-red-500 px-8 py-4 rounded-2xl font-bold tracking-widest uppercase transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                >
                  <AlertTriangle className="animate-pulse" />
                  Proceed to Deep Forensic Room
                </button>
              </motion.div>
            )}

            {/* Deep Forensic Room Render */}
            <AnimatePresence>
              {showPhase2 && <DeepForensicRoom scanId={result.id} />}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
