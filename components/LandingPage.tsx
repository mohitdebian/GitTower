import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Check, 
  X,
  Search, 
  Zap, 
  Box, 
  ChevronDown,
  Target,
  Sparkles,
  Lock,
  MessageSquare,
  MessageCircle,
  GitPullRequest,
  Activity,
  Layers,
  Inbox,
  LayoutTemplate
} from 'lucide-react';

export default function LandingPage({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="min-h-screen bg-[#06080C] text-slate-400 font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      
      {/* Navbar */}
      <nav className="absolute top-0 inset-x-0 h-24 flex items-center px-8 lg:px-12 justify-between z-50 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1E293B] flex items-center justify-center border border-slate-700/50">
            <Box className="w-5 h-5 text-blue-500" />
          </div>
          <span className="font-semibold text-white text-xl tracking-tight">GitTower</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          <a href="#why-gittower" className="hover:text-white transition-colors">Why GitTower</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <div className="flex items-center gap-6 ml-4">
            <button 
              onClick={onConnect}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Github className="w-4 h-4" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <main className="pt-32 pb-24 px-8 lg:px-12 max-w-[1400px] mx-auto relative min-h-[90vh] flex items-center">
        
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col w-full relative z-10">
          
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-32 items-center w-full mt-16 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center lg:pr-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-200 tracking-tight leading-[1.15] max-w-2xl">
                Review a PR. Check a build. Find a mention. <br/>
                <span className="text-slate-400 text-3xl md:text-4xl lg:text-5xl block mt-4">Your GitHub is scattered across 20 open tabs.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl mt-8">
                You're losing hours every week jumping between different repositories, refreshing CI pipelines, and hunting down notifications just to figure out what you need to do next.
              </p>
            </motion.div>

            {/* Hero Right Mockup (Stack of Tabs) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[450px] hidden lg:block"
            >
              {/* We create a stack of floating browser windows fading out */}
              {[
                { top: "0px", right: "20px", opacity: 0.2, scale: 0.85, title: "inbox - mohitdebian" },
                { top: "40px", right: "60px", opacity: 0.4, scale: 0.9, title: "Pull requests - QwenPaw" },
                { top: "80px", right: "100px", opacity: 0.6, scale: 0.95, title: "Review request for #662" },
                { top: "120px", right: "140px", opacity: 0.8, scale: 0.98, title: "CI / Tests failed - QwenPaw" },
                { top: "160px", right: "180px", opacity: 1, scale: 1, title: "Issues - alondemarc/QwenPaw", z: 10 },
                { top: "200px", right: "120px", opacity: 0.9, scale: 1.02, title: "Dependabot alerts", z: 20 },
                { top: "240px", right: "60px", opacity: 0.8, scale: 1.05, title: "Workflow run - Deploy Preview", z: 30 },
                { top: "280px", right: "0px", opacity: 0.7, scale: 1.08, title: "React - Pull Request #842", z: 40 },
              ].map((tab, i) => (
                <div 
                  key={i}
                  className="absolute w-[450px] bg-[#0D1117] border border-slate-700/60 rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                  style={{ 
                    top: tab.top, 
                    right: tab.right, 
                    opacity: tab.opacity, 
                    transform: `scale(${tab.scale})`,
                    zIndex: tab.z || i
                  }}
                >
                  <div className="h-10 bg-[#161B22] border-b border-slate-800 flex items-center px-4 gap-3">
                    <Github className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-300 truncate flex-1">{tab.title}</span>
                    <X className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="h-24 p-4 opacity-30">
                    <div className="h-2 w-3/4 bg-slate-700 rounded mb-3" />
                    <div className="h-2 w-1/2 bg-slate-700 rounded mb-3" />
                    <div className="h-2 w-5/6 bg-slate-700 rounded" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Solution Statement & CTA (Moved Below) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col items-center text-center mt-8">
            <div className="text-3xl text-slate-600 font-bold mb-8 tracking-widest animate-pulse">...</div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-2xl">
              GitTower brings it all into one.
            </h2>
            
            <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Stop context switching. All your pull requests, reviews, discussions, issues, and workflows—organized into a single dashboard around what matters right now.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-center">
              <button 
                onClick={onConnect}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all text-lg shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.8)] hover:-translate-y-1 group"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Continue with GitHub 
              </button>
              <span className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-800/30 px-4 py-2 rounded-full border border-slate-700/50">
                <Check className="w-4 h-4 text-emerald-400" /> Free forever. No credit card.
              </span>
            </div>
          </motion.div>
          
        </div>
      </main>

      {/* 2. This is GitTower Section */}
      <section id="why-gittower" className="py-32 relative z-20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
          
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              This is<br/>
              <span className="text-blue-500">GitTower.</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed max-w-sm">
              One workspace.<br/>
              Everything that needs your attention.
            </p>
          </div>

          {/* Big App Mockup */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-800 bg-[#0A0D14] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
              
              {/* Sidebar */}
              <div className="w-full md:w-56 border-r border-slate-800/80 bg-[#06080C] p-4 hidden md:flex flex-col gap-6 shrink-0">
                <div className="flex items-center gap-2 mb-2 px-2">
                   <div className="w-6 h-6 rounded border border-slate-700 bg-slate-800 flex items-center justify-center"><Box className="w-3.5 h-3.5 text-blue-500" /></div>
                   <span className="text-white font-semibold text-sm tracking-wide">GitTower</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-2 rounded-lg text-slate-400 text-sm">
                    <div className="flex items-center gap-3"><Inbox className="w-4 h-4" /> Inbox</div>
                    <span className="text-[10px] px-1.5 rounded-full bg-slate-800 text-slate-400">9</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-slate-400 text-sm">
                    <div className="flex items-center gap-3"><Search className="w-4 h-4" /> Review Requests</div>
                    <span className="text-[10px] px-1.5 rounded-full bg-slate-800 text-slate-400">1</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-slate-400 text-sm">
                    <div className="flex items-center gap-3"><Activity className="w-4 h-4" /> Mentions</div>
                    <span className="text-[10px] px-1.5 rounded-full bg-slate-800 text-slate-400">7</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 text-white font-medium text-sm border border-slate-700/50">
                    <div className="flex items-center gap-3"><GitPullRequest className="w-4 h-4 text-blue-400" /> My Pull Requests</div>
                    <span className="text-[10px] px-1.5 rounded-full bg-blue-500/20 text-blue-400">7</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-slate-400 text-sm">
                    <div className="flex items-center gap-3"><Layers className="w-4 h-4" /> Involved</div>
                    <span className="text-[10px] px-1.5 rounded-full bg-slate-800 text-slate-400">15</span>
                  </div>
                </div>
                
                <div className="mt-auto flex items-center gap-3 px-2">
                  <div className="w-7 h-7 rounded-full bg-slate-700 shrink-0" />
                  <div className="text-xs text-white font-medium">Mohit Singh</div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 bg-[#0A0D14] flex flex-col p-8 overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Good morning, Mohit 👋</h1>
                    <p className="text-slate-400 text-sm">Here's what's happening with your work.</p>
                  </div>
                  <div className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-300 flex items-center gap-2">
                    All Repositories <ChevronDown className="w-3 h-3" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-medium mb-2"><Inbox className="w-3 h-3" /> Needs Me</div>
                    <div className="text-2xl font-bold text-white mb-1">12</div>
                    <div className="text-[10px] text-slate-500">Items require your action</div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-medium mb-2"><Activity className="w-3 h-3" /> Waiting On</div>
                    <div className="text-2xl font-bold text-white mb-1">7</div>
                    <div className="text-[10px] text-slate-500">Waiting for others</div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium mb-2"><Zap className="w-3 h-3" /> Active Work</div>
                    <div className="text-2xl font-bold text-white mb-1">5</div>
                    <div className="text-[10px] text-slate-500">Currently running</div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-red-400 text-xs font-medium mb-2"><X className="w-3 h-3" /> Blocked</div>
                    <div className="text-2xl font-bold text-white mb-1">3</div>
                    <div className="text-[10px] text-slate-500">Needs attention</div>
                  </div>
                </div>

                <div className="flex gap-6 h-full">
                  <div className="flex-1 bg-[#0D1117] border border-slate-800 rounded-xl p-5">
                    <h3 className="text-white font-medium text-sm mb-4">Active Work</h3>
                    <div className="space-y-4">
                      {/* Active Work Items */}
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-800 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white font-medium">QwenPaw / <span className="text-slate-400 font-normal">Tests</span></span>
                            <span className="text-slate-500">CI</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full mb-1"><div className="h-full w-2/3 bg-blue-500 rounded-full"></div></div>
                          <div className="flex justify-between text-[10px] text-slate-500">
                            <span>11m</span>
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> Running • 14m</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-800 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white font-medium">GitTower / <span className="text-slate-400 font-normal">Deploy Preview</span></span>
                            <span className="text-slate-500">Deploy</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full mb-1"><div className="h-full w-1/4 bg-blue-500 rounded-full"></div></div>
                          <div className="flex justify-between text-[10px] text-slate-500">
                            <span>52s</span>
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> Running • 4m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar Mock */}
                  <div className="w-56 flex flex-col gap-4">
                    <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-purple-400 text-xs font-medium mb-3"><Sparkles className="w-3 h-3" /> Insight</div>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                        Your PR in QwenPaw is blocked due to failing Ubuntu tests.<br/><br/>
                        Contract tests passed.
                      </p>
                      <span className="text-[10px] text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1">View Details <ArrowRight className="w-3 h-3"/></span>
                    </div>

                    <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4 flex-1">
                      <h3 className="text-white font-medium text-sm mb-4">Timeline</h3>
                      <div className="relative pl-3 space-y-3 before:absolute before:inset-y-1 before:left-[4px] before:w-px before:bg-slate-800">
                        <div className="relative flex items-center gap-3 text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 z-10 -ml-[13.5px]" />
                          <span className="text-slate-500 w-6">10:12</span>
                          <span className="text-slate-400 truncate">PR #6526 opened</span>
                        </div>
                        <div className="relative flex items-center gap-3 text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 z-10 -ml-[13.5px]" />
                          <span className="text-slate-500 w-6">10:18</span>
                          <span className="text-slate-400 truncate">CI started</span>
                        </div>
                        <div className="relative flex items-center gap-3 text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 z-10 -ml-[13.5px]" />
                          <span className="text-slate-500 w-6">10:24</span>
                          <span className="text-red-400 truncate">5 jobs failed</span>
                        </div>
                        <div className="relative flex items-center gap-3 text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] z-10 -ml-[13.5px]" />
                          <span className="text-slate-500 w-6">10:32</span>
                          <span className="text-blue-400 truncate font-medium">CI restarted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Problem vs Solution */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-12 grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          
          {/* Problem */}
          <div className="bg-[#0A0D14] border border-slate-800/80 rounded-3xl p-10 relative overflow-hidden h-[420px] shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8">The problem</h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-slate-400 text-[15px]"><X className="w-5 h-5 text-red-500 shrink-0"/> Too many tabs</li>
                <li className="flex items-center gap-4 text-slate-400 text-[15px]"><X className="w-5 h-5 text-red-500 shrink-0"/> Too much context switching</li>
                <li className="flex items-center gap-4 text-slate-400 text-[15px]"><X className="w-5 h-5 text-red-500 shrink-0"/> Important things get missed</li>
                <li className="flex items-center gap-4 text-slate-400 text-[15px]"><X className="w-5 h-5 text-red-500 shrink-0"/> Hard to know what to do next</li>
                <li className="flex items-center gap-4 text-slate-400 text-[15px]"><X className="w-5 h-5 text-red-500 shrink-0"/> Work is scattered everywhere</li>
              </ul>
            </div>
            
            {/* Background Blur Graphic */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-20 blur-[2px] scale-110 pointer-events-none select-none mix-blend-screen">
              <div className="w-64 space-y-3">
                <div className="h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center px-4"><div className="w-24 h-2 bg-slate-600 rounded" /></div>
                <div className="h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center px-4"><div className="w-32 h-2 bg-slate-600 rounded" /></div>
                <div className="h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center px-4"><div className="w-20 h-2 bg-slate-600 rounded" /></div>
                <div className="h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center px-4"><div className="w-28 h-2 bg-slate-600 rounded" /></div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex w-14 h-14 rounded-full border border-slate-700/50 bg-[#0A0D14] items-center justify-center shadow-xl shrink-0 z-10">
            <ArrowRight className="w-6 h-6 text-slate-500" />
          </div>

          {/* Solution */}
          <div className="bg-[#0A0D14] border border-slate-800/80 rounded-3xl p-10 relative overflow-hidden h-[420px] shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8">The solution</h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-slate-300 text-[15px]"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> One place for all your work</li>
                <li className="flex items-center gap-4 text-slate-300 text-[15px]"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> Real-time awareness</li>
                <li className="flex items-center gap-4 text-slate-300 text-[15px]"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> Never miss what matters</li>
                <li className="flex items-center gap-4 text-slate-300 text-[15px]"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> Know exactly what to do next</li>
                <li className="flex items-center gap-4 text-slate-300 text-[15px]"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> Workflows that fit your brain</li>
              </ul>
            </div>
            
            {/* Background Blur Graphic */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-20 blur-[1px] scale-110 pointer-events-none select-none">
              <div className="w-56 space-y-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-400 text-xs mb-2"><Inbox className="w-3 h-3" /> Needs Me</div>
                  <div className="text-2xl font-bold text-white">12</div>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-400 text-xs mb-2"><Activity className="w-3 h-3" /> Waiting On</div>
                  <div className="text-2xl font-bold text-white">7</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="py-24 border-t border-slate-800/50 bg-[#040609]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for how developers actually work</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Real-time, not delayed</h3>
              <p className="text-[15px] text-slate-400 leading-relaxed">
                Live updates for PRs, reviews, mentions, CI, deployments, and everything in between.
              </p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                <Target className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Context over noise</h3>
              <p className="text-[15px] text-slate-400 leading-relaxed">
                We surface what matters to you and hide the rest.
              </p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                <Sparkles className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">AI that gets it <span className="text-[10px] uppercase tracking-wider bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">Coming Soon</span></h3>
              <p className="text-[15px] text-slate-400 leading-relaxed">
                We'll be implementing AI in the near future to provide smart summaries, blocker detection, and next actions tailored to your work.
              </p>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                <Lock className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Your data, your control</h3>
              <p className="text-[15px] text-slate-400 leading-relaxed">
                Built with privacy in mind. Your code stays on GitHub. We just help you work better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Roadmap */}
      <section id="roadmap" className="py-24 border-t border-slate-800/50 bg-[#06080C]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Roadmap</h2>
            <p className="text-slate-400">What we are building next to make GitTower even better.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#0A0D14] border border-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400" /> AI Integration
                </h3>
                <span className="text-xs uppercase tracking-wider bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-medium">Coming Soon</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">We are bringing AI natively into your workspace to help you merge faster and context-switch less.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <strong>Smart Summaries:</strong> Get instant TL;DRs of massive pull requests before you start reviewing.</li>
                <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <strong>Blocker Detection:</strong> AI automatically parses failed CI logs to tell you exactly what broke.</li>
                <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <strong>Next Actions:</strong> Suggestions on who to ping or what to fix to unblock your workflow.</li>
              </ul>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#0A0D14] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-2">Team Analytics</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Gain insights into your team's velocity, review times, and bottlenecks directly from your GitHub data without switching to a different tool.</p>
              </div>
              <div className="bg-[#0A0D14] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-2">Mobile Companion</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A native mobile experience to manage your pull requests, reply to mentions, and keep track of your active work on the go.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.6. FAQ */}
      <section id="faq" className="py-24 border-t border-slate-800/50 bg-[#040609]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-[#0A0D14] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Is GitTower free?</h3>
              <p className="text-slate-400">Yes, GitTower is completely free to use. There are no premium tiers, paywalls, or hidden costs.</p>
            </div>
            <div className="bg-[#0A0D14] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Does GitTower store my source code?</h3>
              <p className="text-slate-400">No. GitTower only requests the necessary GitHub permissions to read your issues, PRs, and workflows to display them in your dashboard. Your source code never leaves GitHub's servers.</p>
            </div>
            <div className="bg-[#0A0D14] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Do I need to install an app on my computer?</h3>
              <p className="text-slate-400">GitTower is entirely web-based and runs in your browser. Simply log in with your GitHub account and you're good to go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Footer */}
      <footer className="py-32 bg-[#06080C] text-center border-t border-slate-800/50">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-12">
            Ship more. Stress less.
          </h2>
          <button 
            onClick={onConnect}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors text-lg shadow-2xl shadow-blue-500/25 group w-full sm:w-auto"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>
      </footer>
    </div>
  );
}
