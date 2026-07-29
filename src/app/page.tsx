"use client";

import React, { useState, useEffect } from "react";
import { Github, Loader2, GitPullRequest, MessageCircle, GitMerge, CheckCircle2, AlertCircle, ExternalLink, LogOut, Inbox } from "lucide-react";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        checkAuth();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/github/user');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleConnect = async () => {
    try {
      const response = await fetch('/api/auth/url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      
      const authWindow = window.open(url, 'oauth_popup', 'width=600,height=700');
      if (!authWindow) {
        alert('Please allow popups for this site to connect your account.');
      }
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-sm border p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
            <Github className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Welcome to GitTower</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your focused workspace for GitHub collaboration. Connect to get started.
          </p>
          <button
            onClick={handleConnect}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-all active:scale-[0.98]"
          >
            <Github className="w-5 h-5" />
            Connect GitHub
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-white border-r shrink-0 sticky top-0 md:h-screen p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
            <Github className="w-5 h-5" />
          </div>
          <span className="font-semibold text-gray-900">GitTower</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
          {user?.avatar_url && (
            <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{user?.name || user?.login}</div>
            <div className="text-xs text-gray-500 truncate">@{user?.login}</div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </aside>
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Welcome, {user?.login}!</h1>
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
             <Inbox className="w-12 h-12 mx-auto mb-4 text-gray-300" />
             <p>This is a simplified version of GitTower since we restarted the workspace to resolve build issues.</p>
             <p className="mt-2 text-sm">You are successfully authenticated via proper GitHub OAuth with Next.js App router!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
