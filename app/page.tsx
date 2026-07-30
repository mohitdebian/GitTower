'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Loader2, GitPullRequest, AtSign, MessageCircle, GitMerge, CheckCircle2, AlertCircle, ExternalLink, LogOut, Inbox, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Send, AtSign as AtSignIcon, Hash, HelpCircle, CheckSquare, GitCommit } from 'lucide-react';

type User = {
  login: string;
  avatar_url: string;
  name: string;
};

type GitHubIssue = {
  id: number;
  html_url: string;
  title: string;
  number: number;
  state: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  pull_request?: any;
  repository_url: string;
  related_issue?: {
    number: number;
    title: string;
    html_url: string;
  };
  body?: string;
  comments_list?: {
    id: number;
    user: { login: string; avatar_url: string };
    created_at: string;
    body: string;
  }[];
};

type DashboardData = {
  reviewRequested: GitHubIssue[];
  mentions: GitHubIssue[];
  myPrs: GitHubIssue[];
  involved: GitHubIssue[];
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<'inbox' | 'reviews' | 'mentions' | 'my-prs' | 'involved' | 'manage-repos'>('inbox');
  const [mutedRepos, setMutedRepos] = useState<Record<string, boolean>>({'vercel/next.js': true});
  const [selectedItem, setSelectedItem] = useState<GitHubIssue | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    // Mock Data
    setTimeout(() => {
      setData({
        reviewRequested: [
          {
            id: 1,
            html_url: "#",
            title: "Implement useOptimistic hook primitives",
            number: 842,
            state: "open",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user: { login: "sophiebits", avatar_url: "https://avatars.githubusercontent.com/u/6820?v=4" },
            repository_url: "https://api.github.com/repos/facebook/react",
            body: "This PR introduces the `useOptimistic` hook primitive as discussed in #840.\n\n### Changes:\n- Added `useOptimistic` implementation in `react-reconciler`.\n- Added tests for concurrent rendering.\n\nPlease review the scheduler integration part carefully.",
            comments_list: [
              {
                id: 101,
                user: { login: "acdlite", avatar_url: "https://avatars.githubusercontent.com/u/3624098?v=4" },
                created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                body: "LGTM! But could you add a test case for when the optimistic update gets rejected by the server?"
              }
            ]
          }
        ],
        mentions: [
          {
            id: 2,
            html_url: "#",
            title: "What's the best way to handle...",
            number: 1205,
            state: "open",
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            user: { login: "jaredpalmer", avatar_url: "https://avatars.githubusercontent.com/u/4060187?v=4" },
            repository_url: "https://api.github.com/repos/vercel/turbo",
            body: "I'm trying to figure out the best way to handle persistent caching across builds when `TURBO_CACHE_DIR` is set.\n\nHey @developer, didn't you run into this issue last month? What was your workaround?",
            comments_list: []
          }
        ],
        myPrs: [
          {
            id: 3,
            html_url: "#",
            title: "feat: Add ultra-fast parser",
            number: 4421,
            state: "open",
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
            repository_url: "https://api.github.com/repos/rust-lang/rust",
            related_issue: {
              number: 4420,
              title: "Parser is too slow on large files",
              html_url: "#"
            }
          },
          {
            id: 5,
            html_url: "#",
            title: "fix: Memory leak in SSR",
            number: 881,
            state: "open",
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
            repository_url: "https://api.github.com/repos/vercel/next.js",
            related_issue: {
              number: 875,
              title: "Process runs out of memory after 1 hour",
              html_url: "#"
            }
          }
        ],
        involved: [
          {
            id: 4,
            html_url: "#",
            title: "Review feedback from yesterday",
            number: 56,
            state: "open",
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            user: { login: "qwen", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4" },
            repository_url: "https://api.github.com/repos/qwen/paw",
            body: "I've updated the logic based on yesterday's review.",
            comments_list: [
              {
                id: 201,
                user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
                created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
                body: "Looks much better, thanks!"
              },
              {
                id: 202,
                user: { login: "qwen", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4" },
                created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                body: "Merging this now."
              }
            ]
          }
        ]
      });
      setLoading(false);
    }, 500);
  };

  const checkAuth = async () => {
    // Mock authentication
    setIsAuthenticated(true);
    setUser({
      login: "developer",
      name: "Developer",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4"
    });
    fetchDashboard();
  };

  useEffect(() => {
    setTimeout(() => checkAuth(), 0);
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setTimeout(() => checkAuth(), 0);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setData(null);
  };

  const extractRepoName = (url: string) => {
    const match = url.match(/repos\/(.+)\/(.+)$/);
    return match ? `${match[1]}/${match[2]}` : 'Unknown';
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-base">
        <Loader2 className="w-8 h-8 text-app-meta animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-app-base flex flex-col items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-app-panel rounded-2xl shadow-sm border border-app-border p-8 text-center"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
            <Github className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-app-text mb-3 tracking-tight">Welcome to GitTower</h1>
          <p className="text-app-muted mb-8 leading-relaxed">
            Your focused workspace for GitHub collaboration. Stop searching for work across repositories and start taking action on what matters.
          </p>
          <button
            onClick={handleConnect}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all active:scale-[0.98]"
          >
            <Github className="w-5 h-5" />
            Connect GitHub
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-base flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-app-base text-app-muted flex flex-col border-r border-app-border shrink-0 sticky top-0 md:h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-app-border">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Github className="w-5 h-5" /></div>
          <span className="font-semibold text-app-text tracking-wide">GitTower</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <div className="text-xs font-medium text-app-muted uppercase tracking-wider mb-2 px-3 mt-4">Views</div>
          <button onClick={() => { setActiveView('inbox'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'inbox' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <Inbox className="w-4 h-4" />
            <span className="text-sm font-medium">Inbox</span>
          </button>
          <button onClick={() => { setActiveView('reviews'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'reviews' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <GitPullRequest className="w-4 h-4" />
            <span className="text-sm font-medium">Review Requests</span>
          </button>
          <button onClick={() => { setActiveView('mentions'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'mentions' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <AtSign className="w-4 h-4" />
            <span className="text-sm font-medium">Mentions</span>
          </button>
          <button onClick={() => { setActiveView('my-prs'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'my-prs' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <GitMerge className="w-4 h-4" />
            <span className="text-sm font-medium">My Pull Requests</span>
          </button>
          <button onClick={() => { setActiveView('involved'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'involved' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Involved</span>
          </button>
          
          <div className="text-xs font-medium text-app-muted uppercase tracking-wider mb-2 px-3 mt-4">Settings</div>
          <button onClick={() => { setActiveView('manage-repos'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'manage-repos' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Manage Repositories</span>
          </button>
        </div>

        {user && (
          <div className="p-4 border-t border-app-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={user.avatar_url} alt={user.login} width={32} height={32} className="w-8 h-8 rounded-full bg-app-sidebar" referrerPolicy="no-referrer" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-app-text truncate max-w-[100px]">{user.name || user.login}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-app-panel rounded-lg text-app-meta hover:text-app-text transition-colors" title="Log out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12">
          
          {selectedItem ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <button 
                onClick={() => setSelectedItem(null)} 
                className="flex items-center gap-2 text-sm text-app-muted hover:text-app-text transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to list
              </button>
              
              <div className="border-b border-app-border pb-6">
                <div className="flex items-center gap-3 text-sm text-app-muted mb-3">
                  <span className="font-medium text-app-text">{extractRepoName(selectedItem.repository_url)}</span>
                  <span>•</span>
                  <span>#{selectedItem.number}</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 capitalize">
                    {selectedItem.state}
                  </span>
                </div>
                <h1 className="text-2xl font-semibold text-app-text mb-4">{selectedItem.title}</h1>
                <div className="flex items-center gap-3 text-sm text-app-muted">
                  <Image src={selectedItem.user.avatar_url} alt={selectedItem.user.login} width={24} height={24} className="rounded-full" />
                  <span className="font-medium text-app-text">{selectedItem.user.login}</span>
                  <span>opened this on {new Date(selectedItem.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Timeline / Conversation */}
                <div className="flex-1 relative min-w-0 pb-8">
                  {/* Vertical line connecting timeline */}
                  <div className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-app-border z-0"></div>
                  
                  <div className="space-y-8">
                    {/* OP Body */}
                    <div className="relative z-10 flex gap-4">
                      <div className="shrink-0 mt-1">
                        <Image src={selectedItem.user.avatar_url} alt={selectedItem.user.login} width={40} height={40} className="rounded-full ring-4 ring-app-base" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-app-text">{selectedItem.user.login}</span>
                          <span className="text-app-meta text-sm">{formatDistanceToNow(new Date(selectedItem.created_at), { addSuffix: true })}</span>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-app-muted prose-p:leading-relaxed prose-pre:bg-app-panel prose-pre:border prose-pre:border-app-border prose-pre:mt-4">
                          <Markdown remarkPlugins={[remarkGfm]}>{selectedItem.body || "*No description provided.*"}</Markdown>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comments */}
                    {selectedItem.comments_list?.map(comment => (
                      <div key={comment.id} className="relative z-10 flex gap-4">
                        <div className="shrink-0 mt-1">
                          <Image src={comment.user.avatar_url} alt={comment.user.login} width={40} height={40} className="rounded-full ring-4 ring-app-base" />
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-app-text">{comment.user.login}</span>
                            <span className="text-app-meta text-sm">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                          </div>
                          <div className="prose prose-invert prose-sm max-w-none text-app-muted prose-p:leading-relaxed prose-pre:bg-app-panel prose-pre:border prose-pre:border-app-border prose-pre:mt-4">
                            <Markdown remarkPlugins={[remarkGfm]}>{comment.body}</Markdown>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Reply Box */}
                  <div className="sticky bottom-6 z-20 pt-2">
                    <div className="bg-app-panel border border-app-border rounded-xl shadow-xl p-2">
                      <textarea 
                        placeholder="Reply..."
                        className="w-full bg-transparent p-3 text-app-text text-sm placeholder:text-app-meta focus:outline-none min-h-[60px] resize-none"
                      ></textarea>
                      <div className="flex items-center justify-between mt-2 px-2 pb-1">
                        <div className="flex items-center gap-4 text-app-meta text-xs font-medium">
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><AtSignIcon className="w-3.5 h-3.5" /> Mention</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><Hash className="w-3.5 h-3.5" /> Link issue</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><CheckSquare className="w-3.5 h-3.5" /> Decision</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><HelpCircle className="w-3.5 h-3.5" /> Question</button>
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
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Reviewers</h3>
                    <div className="text-sm text-app-meta">No reviewers requested</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Assignees</h3>
                    <div className="text-sm text-app-meta">No one assigned</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Labels</h3>
                    <div className="text-sm text-app-meta">None yet</div>
                  </div>
                  {selectedItem.related_issue && (
                    <div>
                      <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Related Issue</h3>
                      <a href={selectedItem.related_issue.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center gap-1 w-fit">
                        #{selectedItem.related_issue.number} {selectedItem.related_issue.title}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-app-text tracking-tight">
                {activeView === 'inbox' && 'Your Inbox'}
                {activeView === 'reviews' && 'Review Requests'}
                {activeView === 'mentions' && 'Mentions'}
                {activeView === 'my-prs' && 'My Pull Requests'}
                {activeView === 'involved' && 'Involved Discussions'}
                {activeView === 'manage-repos' && 'Manage Repositories'}
              </h1>
              <p className="text-app-muted mt-1">
                {activeView === 'inbox' && 'Focus on what needs your attention right now.'}
                {activeView === 'reviews' && 'Pull requests where your review is requested.'}
                {activeView === 'mentions' && 'Conversations where you were mentioned.'}
                {activeView === 'my-prs' && 'Track the status of pull requests you opened.'}
                {activeView === 'involved' && 'Discussions you have participated in.'}
                {activeView === 'manage-repos' && 'Control which repositories show up in your inbox.'}
              </p>
            </div>
            <button 
              onClick={fetchDashboard}
              className="px-4 py-2 bg-app-panel border border-app-border rounded-lg text-sm font-medium text-app-muted hover:text-app-text hover:border-app-muted shadow-sm transition-all flex items-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
            </button>
          </header>

          {loading && !data ? (
            <div className="flex flex-col items-center justify-center py-20 text-app-meta">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Fetching your action items...</p>
            </div>
          ) : activeView === 'manage-repos' ? (
            <div className="space-y-12">
              <div className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-app-border flex items-center justify-between">
                  <h3 className="font-semibold text-app-text">Your Repositories</h3>
                </div>
                <div className="divide-y divide-app-border">
                  {[
                    { name: 'facebook/react' },
                    { name: 'vercel/next.js' },
                    { name: 'rust-lang/rust' },
                    { name: 'qwen/paw' }
                  ].map((repo, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-app-base transition-colors">
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-app-muted" />
                        <span className="font-medium text-app-text">{repo.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={!!mutedRepos[repo.name]} onChange={() => setMutedRepos(prev => ({...prev, [repo.name]: !prev[repo.name]}))} />
                        <div className="w-11 h-6 bg-app-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-app-muted">Muted</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : data ? (
            <div className="space-y-12">
              {(activeView === 'reviews') && (
                <Section 
                  id="reviews"
                  title="Review Requests" 
                  icon={<GitPullRequest className="w-5 h-5 text-blue-500" />} 
                  items={data.reviewRequested.filter(item => !mutedRepos[extractRepoName(item.repository_url)])} 
                  emptyMessage="You have no pending review requests. Great job!"
                  extractRepoName={extractRepoName}
                  onItemSelected={setSelectedItem}
                />
              )}
              {(activeView === 'inbox' || activeView === 'mentions') && (
                <Section 
                  id="mentions"
                  title="Mentions" 
                  icon={<AtSign className="w-5 h-5 text-orange-500" />} 
                  items={data.mentions.filter(item => !mutedRepos[extractRepoName(item.repository_url)])} 
                  emptyMessage="No unaddressed mentions."
                  extractRepoName={extractRepoName}
                  onItemSelected={setSelectedItem}
                />
              )}
              {(activeView === 'inbox' || activeView === 'my-prs') && (
                <Section 
                  id="my-prs"
                  title="Your Pull Requests" 
                  icon={<GitMerge className="w-5 h-5 text-purple-500" />} 
                  items={data.myPrs.filter(item => !mutedRepos[extractRepoName(item.repository_url)])} 
                  emptyMessage="You don't have any open pull requests."
                  extractRepoName={extractRepoName}
                  onItemSelected={setSelectedItem}
                />
              )}
              {(activeView === 'inbox' || activeView === 'involved') && (
                <Section 
                  id="involved"
                  title="Involved Discussions" 
                  icon={<MessageCircle className="w-5 h-5 text-emerald-500" />} 
                  items={data.involved.filter(item => !mutedRepos[extractRepoName(item.repository_url)])} 
                  emptyMessage="You're all caught up on discussions."
                  extractRepoName={extractRepoName}
                  onItemSelected={setSelectedItem}
                />
              )}
            </div>
          ) : null}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function Section({ id, title, icon, items, emptyMessage, extractRepoName, onItemSelected }: { id: string, title: string, icon: React.ReactNode, items: GitHubIssue[], emptyMessage: string, extractRepoName: (url: string) => string, onItemSelected: (item: GitHubIssue) => void }) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-app-text">{title}</h2>
        <span className="bg-app-border text-app-muted text-xs font-medium px-2 py-0.5 rounded-full">{items.length}</span>
      </div>
      
      {items.length === 0 ? (
        <div className="bg-app-panel border border-app-border rounded-xl p-8 text-center shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-app-muted mx-auto mb-3" />
          <p className="text-app-muted">{emptyMessage}</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden flex flex-col"
        >
          {items.map((item, index) => (
            <button 
              key={item.id} 
              onClick={() => onItemSelected(item)}
              className={`block w-full text-left p-4 sm:px-6 hover:bg-app-base transition-colors group ${index !== items.length - 1 ? 'border-b border-app-border' : ''}`}
            >
              <div className="flex items-start gap-4">
                <Image src={item.user.avatar_url} alt={item.user.login} width={32} height={32} className="w-8 h-8 rounded-full bg-app-sidebar shrink-0 mt-0.5" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1">
                    <h3 className="text-[15px] font-medium text-app-text truncate pr-4 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-app-meta whitespace-nowrap shrink-0">
                      {formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-app-muted">
                    <span className="font-medium text-app-text">{extractRepoName(item.repository_url)}</span>
                    <span className="text-app-muted">•</span>
                    <span>#{item.number}</span>
                    <span className="text-app-muted">•</span>
                    <span>by {item.user.login}</span>
                  </div>
                  {item.related_issue && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <div className="bg-app-border text-app-muted px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Fixes #{item.related_issue.number}</span>
                      </div>
                      <a href={item.related_issue.html_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-app-meta hover:text-app-muted transition-colors truncate">
                        {item.related_issue.title}
                      </a>
                    </div>
                  )}
                </div>
                <div className="shrink-0 text-app-muted group-hover:text-app-muted transition-colors hidden sm:block">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </section>
  );
}
