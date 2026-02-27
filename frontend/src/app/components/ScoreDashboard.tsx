'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, Activity, Cpu, Database, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type RiskCategory = 'Contextual' | 'Synthetic' | 'Narrative' | 'Benign';

interface ScanResult {
  id: string;
  score: number;
  category: RiskCategory;
  confidence: number;
  routing_decision: string[];
  status: string;
}

export default function ScoreDashboard() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const startScan = async () => {
    setLoading(true);
    setResult(null);
    try {
      // First try to fetch from the actual backend
      const response = await fetch('http://localhost:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      }).catch(err => {
        console.log("Backend not reachable, using mock data...");
        return null;
      });

      if (response && response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        // Mocking backend response for demonstration if backend 
        // is not running or fails.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const mockResult: ScanResult = {
          id: `scan_${Math.floor(Math.random() * 9000) + 1000}`,
          score: Math.floor(Math.random() * 100),
          category: 'Synthetic',
          confidence: 0.94,
          routing_decision: ['Diffusion Artifact Lab', 'Optical Flow Consistency'],
          status: 'escalated'
        };
        
        if (mockResult.score < 30) {
          mockResult.category = 'Benign';
          mockResult.routing_decision = [];
          mockResult.status = 'completed';
        } else {
          const categories: RiskCategory[] = ['Contextual', 'Synthetic', 'Narrative'];
          mockResult.category = categories[Math.floor(Math.random() * categories.length)];
          if (mockResult.category === 'Contextual') {
              mockResult.routing_decision = ['Digital Patient Zero Traceback', 'TIDE-MARK Clustering'];
          } else if (mockResult.category === 'Synthetic') {
              mockResult.routing_decision = ['Diffusion Artifact Lab', 'Optical Flow Consistency'];
          } else {
              mockResult.routing_decision = ['Sovereigner Sentiment Analysis', 'Narrative Contradiction Engine'];
          }
        }
        setResult(mockResult);
      }
    } catch (error) {
      console.error(error);
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
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-blue-500" size={32} />
          <h1 className="text-3xl font-bold text-white tracking-tight">VERITAS.ai <span className="text-zinc-500 text-lg font-normal">| Forensic Engine</span></h1>
        </div>

        <div className="relative group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL, Image hash or Transcript..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 px-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all pl-14"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={24} />
          <button
            onClick={startScan}
            disabled={loading || !url}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            {loading ? <Activity className="animate-spin" size={20} /> : 'Initiate Autopsy'}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-12 space-y-4"
          >
            <div className="relative w-24 h-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-zinc-800 border-l-transparent rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-zinc-800 border-l-transparent rounded-full"
              />
            </div>
            <p className="text-zinc-400 font-mono animate-pulse">PHASE 1: SEMANTIC TRIAGE IN PROGRESS...</p>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Score Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
              <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Deception Score</p>
              <div className={`text-6xl font-black ${getScoreColor(result.score)}`}>
                {result.score}
              </div>
              <p className="text-zinc-400 text-sm">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
            </div>

            {/* Category Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Risk Category</p>
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-full">
                {getCategoryIcon(result.category)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{result.category}</h3>
                <p className="text-zinc-500 text-xs">Phase 1 Classification</p>
              </div>
            </div>

            {/* Routing Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 col-span-1 md:col-span-1 border-l-4 border-l-blue-500">
               <div className="flex items-center gap-2 mb-4 text-blue-500">
                <AlertTriangle size={20} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Risk Routing</h3>
              </div>
              {result.routing_decision.length > 0 ? (
                <div className="space-y-3">
                  {result.routing_decision.map((tool, i) => (
                    <div key={i} className="flex items-center gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-zinc-300 text-sm font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-zinc-500 italic text-sm">
                  No escalation required. Content marked as benign.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Simulation Logs (Optional) */}
      {result && (
         <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-zinc-600">
           <p className="mb-1 uppercase tracking-tighter text-zinc-500">System Logs</p>
           <p>&gt; [${result.id}] Initializing multimodal semantic triage...</p>
           <p>&gt; [${result.id}] Identified potential {result.category.toLowerCase()} pattern.</p>
           <p>&gt; [${result.id}] Routing to {result.routing_decision.join(', ') || 'end-state archive'}.</p>
         </div>
      )}
    </div>
  );
}
