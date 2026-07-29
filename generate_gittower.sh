cat << 'INNER' > app/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Send, AtSign, Github, GitPullRequest } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function GitTower() {
  const { data: session, status } = useSession();
  const [issues, setIssues] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (session?.accessToken) {
      fetch('https://api.github.com/issues?filter=all&state=all', {
        headers: {
          Authorization: `token ${session.accessToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setIssues(data);
        }
      })
      .catch(console.error);
    }
  }, [session]);

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center font-sans text-white">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
          <Github className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold mb-3 tracking-tight">Welcome to GitTower</h1>
        <p className="text-gray-400 mb-8 text-center max-w-sm">A GitHub collaboration workspace that organizes your work by attention.</p>
        <button 
          onClick={() => signIn('github')}
          className="bg-[#24292e] hover:bg-[#2f363d] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 shadow-md"
        >
          <Github className="w-5 h-5" /> Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col md:flex-row font-sans text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0d1117] text-gray-400 flex flex-col border-r border-gray-800 shrink-0 sticky top-0 md:h-screen">
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Github className="w-5 h-5" />
            </div>
            <span className="font-semibold text-white tracking-wide">GitTower</span>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-6">
          <div className="flex items-center gap-3 px-2">
            {session.user?.image && (
              <Image src={session.user.image} alt={session.user.name || "User"} width={32} height={32} className="rounded-full ring-2 ring-gray-800" />
            )}
            <div className="min-w-0">
              <div className="text-sm font-medium text-white truncate">{session.user?.name}</div>
              <button onClick={() => signOut()} className="text-xs text-gray-400 hover:text-white transition-colors">Sign out</button>
            </div>
          </div>

          <div>
            <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">My Inbox</h2>
            <nav className="space-y-0.5">
              <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#161b22] text-sm transition-colors text-white font-medium bg-[#161b22]">
                <div className="flex items-center gap-2">
                  <AtSign className="w-4 h-4 text-blue-400" /> Mentions
                </div>
                <span className="bg-blue-500/10 text-blue-400 text-xs py-0.5 px-2 rounded-full font-medium">{issues.length}</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#161b22]">
        {!selectedItem ? (
          <div className="flex-1 flex flex-col h-full">
            <header className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#0d1117] sticky top-0 z-10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <AtSign className="w-5 h-5 text-blue-400" /> Mentions
              </h2>
            </header>
            
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-800">
                {issues.length > 0 ? issues.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="w-full text-left p-4 hover:bg-gray-800/30 transition-colors group relative"
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                         <GitPullRequest className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                            {item.repository?.full_name || "repository"}
                          </span>
                          <span className="text-xs text-gray-400 shrink-0">
                            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <h3 className="text-base font-medium text-white mb-1 truncate pr-8">
                          {item.title}
                        </h3>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {item.body || "No description provided."}
                        </div>
                      </div>
                    </div>
                  </button>
                )) : (
                  <div className="p-8 text-center text-gray-400">No issues found. Make sure you have authorized GitHub.</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full">
            <header className="px-6 py-4 border-b border-gray-800 flex items-center gap-4 bg-[#0d1117] sticky top-0 z-20 shadow-sm">
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1.5 hover:bg-[#161b22] rounded-md text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span>{selectedItem.repository?.full_name || "repository"}</span>
                  <span>•</span>
                  <span>#{selectedItem.number}</span>
                </div>
                <h2 className="text-lg font-semibold text-white truncate">
                  {selectedItem.title}
                </h2>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 bg-[#161b22]">
              <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="flex-1 relative min-w-0 pb-32">
                  <div className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-gray-800 z-0"></div>
                  
                  <div className="space-y-8">
                    {/* OP Body */}
                    <div className="relative z-10 flex gap-4">
                      <div className="shrink-0 mt-1">
                        {selectedItem.user?.avatar_url ? (
                          <Image src={selectedItem.user.avatar_url} alt={selectedItem.user.login} width={40} height={40} className="rounded-full ring-4 ring-[#161b22] bg-[#0d1117]" />
                        ) : (
                          <div className="w-10 h-10 rounded-full ring-4 ring-[#161b22] bg-gray-800 flex items-center justify-center">
                            <Github className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-white">{selectedItem.user?.login || "User"}</span>
                          <span className="text-gray-400 text-sm">{formatDistanceToNow(new Date(selectedItem.created_at), { addSuffix: true })}</span>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-300 bg-[#0d1117] p-4 rounded-lg border border-gray-800 mt-2 shadow-sm">
                          <Markdown remarkPlugins={[remarkGfm]}>{selectedItem.body || "*No description provided.*"}</Markdown>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Reply Box */}
                  <div className="fixed bottom-6 w-full max-w-[calc(1024px-200px)] lg:max-w-[calc(1024px-350px)] z-20">
                    <div className="bg-[#0d1117] border border-gray-800 rounded-xl shadow-xl p-2">
                      <textarea 
                        value={replyText}
                        onChange={handleReplyChange}
                        placeholder="Reply..."
                        className="w-full bg-transparent p-3 text-white text-sm placeholder:text-gray-500 focus:outline-none min-h-[60px] resize-none"
                      ></textarea>
                      <div className="flex items-center justify-between mt-2 px-2 pb-1">
                        <div className="flex items-center gap-4 text-gray-500 text-xs font-medium">
                          <button className="flex items-center gap-1.5 hover:text-white transition-colors"><AtSign className="w-3.5 h-3.5" /> Mention</button>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Send className="w-3.5 h-3.5" /> Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar Context */}
                <div className="w-full lg:w-64 shrink-0 space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">State</h3>
                    <div className="text-sm text-white capitalize">{selectedItem.state}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
INNER
