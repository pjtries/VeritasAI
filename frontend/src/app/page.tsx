'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import ScoreDashboard from './components/ScoreDashboard';
import LoginScreen from './components/LoginScreen';
import { LogOut } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <header className="relative z-20 px-8 py-6 w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white select-none">
            VERITAS<span className="text-slate-400 dark:text-slate-600">.ai</span>
          </h1>
        </div>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-10 items-center mr-10">
            <a className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" href="#">About us</a>
            <a className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Contact</a>
          </nav>
          <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-800 pl-8">
            {user && (
              <button
                onClick={() => signOut(auth)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Terminate Session</span>
              </button>
            )}
            <button
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center px-6 w-full max-w-7xl mx-auto py-12">
        {user ? (
          <ScoreDashboard />
        ) : (
          <LoginScreen onSuccess={() => { }} />
        )}
      </main>

      <footer className="relative z-20 w-full px-8 py-8 md:py-12 mt-auto border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white tracking-tight">
              Precision, depth, and clarity.
            </h3>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              View Documentation
            </button>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
            <button className="px-5 py-2.5 rounded-full flex items-center space-x-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>System Status</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
