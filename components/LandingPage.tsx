import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  ArrowDown, 
  Check, 
  MessageSquare, 
  GitPullRequest, 
  Search, 
  Zap, 
  Users, 
  Box, 
  Code, 
  GitMerge,
  Heart,
  Activity,
  Layers,
  Inbox,
  LayoutTemplate
} from 'lucide-react';

export default function LandingPage({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#a1a1aa] font-sans overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md z-50 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-purple-500">
            <Box className="w-6 h-6" />
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">GitTower</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">How it Works</a>
          <a href="#" className="hover:text-white transition-colors">Roadmap</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>

        <button 
          onClick={onConnect}
          className="text-sm font-medium px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors text-white flex items-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">Sign in with GitHub</span>
          <span className="sm:hidden">Sign in</span>
        </button>
      </nav>

      {/* 1. Hero Section */}
      <main className="pt-32 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Left Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-8">
              <Heart className="w-3 h-3" />
              Free forever. Open Source.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              GitHub organizes repositories.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">GitTower organizes your work.</span>
            </h1>
            <p className="text-lg text-[#a1a1aa] leading-relaxed mb-10 max-w-xl">
              Pull requests, issues, reviews, mentions, and discussions—all in one place. Know exactly what needs your attention and ship your best work.
            </p>
            <div className="flex flex-col items-start gap-4">
              <button 
                onClick={onConnect}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all text-lg group shadow-[0_0_20px_rgba(147,51,234,0.4)]"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-[#71717a] font-medium tracking-wide pl-2">
                No setup required. Start in seconds.
              </p>
            </div>
          </motion.div>

          {/* Hero Right Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">
              
              {/* Mockup Sidebar */}
              <div className="w-full md:w-56 border-r border-white/5 bg-[#050505] p-4 hidden md:flex flex-col gap-6 shrink-0">
                <div className="flex items-center gap-2 mb-2 px-2">
                   <Box className="w-5 h-5 text-purple-500" />
                   <span className="text-white font-semibold text-sm">GitTower</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#a1a1aa] hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-3 text-sm"><LayoutTemplate className="w-4 h-4" /> Home</div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-purple-500/10 text-purple-400 cursor-pointer">
                    <div className="flex items-center gap-3 text-sm font-medium"><Inbox className="w-4 h-4" /> Needs Me</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/20">7</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#a1a1aa] hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-3 text-sm"><Activity className="w-4 h-4" /> Waiting</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10">11</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#a1a1aa] hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-3 text-sm"><Search className="w-4 h-4" /> Following</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10">18</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#a1a1aa] hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4" /> Done</div>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="text-[11px] font-bold text-[#52525b] uppercase tracking-wider px-2 mb-2">Repositories</div>
                  <div className="flex items-center gap-3 p-2 text-[#a1a1aa] text-sm"><div className="w-4 h-4 rounded-full bg-white/10" /> facebook/react</div>
                  <div className="flex items-center gap-3 p-2 text-[#a1a1aa] text-sm"><div className="w-4 h-4 rounded-full bg-white/10" /> rust-lang/rust</div>
                  <div className="flex items-center gap-3 p-2 text-[#a1a1aa] text-sm"><div className="w-4 h-4 rounded-full bg-white/10" /> vercel/next.js</div>
                </div>
              </div>
              
              {/* Mockup Main Content */}
              <div className="flex-1 bg-[#0a0a0a] flex flex-col relative">
                {/* Search Header */}
                <div className="h-14 border-b border-white/5 px-6 flex items-center">
                  <div className="w-full max-w-sm h-8 bg-white/5 border border-white/5 rounded-md flex items-center px-3">
                    <Search className="w-3.5 h-3.5 text-[#52525b] mr-2" />
                    <span className="text-xs text-[#52525b]">Search anything...</span>
                  </div>
                </div>
                
                {/* Main List */}
                <div className="flex-1 p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      Needs Me <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center">7</span>
                    </h3>
                    <span className="text-xs text-purple-400 font-medium">View all →</span>
                  </div>

                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white">Review React PR</h4>
                          <span className="text-xs text-[#52525b]">5m ago</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">PR</span>
                          <span className="text-xs text-[#71717a]">facebook/react • #30291</span>
                        </div>
                        <p className="text-xs text-[#a1a1aa] mt-1">Sarah Johnson requested review</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white">Reply to discussion</h4>
                          <span className="text-xs text-[#52525b]">30m ago</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">DISC</span>
                          <span className="text-xs text-[#71717a]">rust-lang/rust • #110948</span>
                        </div>
                        <p className="text-xs text-[#a1a1aa] mt-1">PlayerOne asked a question</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white">CI passed</h4>
                          <span className="text-xs text-[#52525b]">1h ago</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">PR</span>
                          <span className="text-xs text-[#71717a]">vercel/next.js • #6201</span>
                        </div>
                        <p className="text-xs text-[#a1a1aa] mt-1">Ready to merge</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Trusted By (Minimal) */}
      <section className="py-12 border-b border-white/5 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-[#71717a] font-medium mb-8">Trusted by developers contributing to</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Minimal text placeholders for logos to match the vibe */}
            <span className="font-bold text-xl tracking-tighter text-white">facebook</span>
            <span className="font-semibold text-xl text-white flex items-center gap-1"><Zap className="w-5 h-5"/> React</span>
            <span className="font-bold text-xl font-mono text-white">rust</span>
            <span className="font-bold text-xl tracking-tighter text-white">▲ Vercel</span>
            <span className="font-bold text-xl text-white">NEXT.js</span>
            <span className="text-sm text-[#a1a1aa]">and many more...</span>
          </div>
        </div>
      </section>

      {/* 2. The Problem Section */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-purple-400 text-sm font-semibold mb-3">The problem</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Your work is everywhere.<br/>Your focus shouldn't be.</h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed max-w-md">
              Juggling multiple repositories, notifications, and conversations makes it hard to stay focused and ship your best work.
            </p>
          </div>
          
          {/* Visual Flowchart */}
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 flex items-center justify-between max-w-2xl ml-auto w-full">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                <Github className="w-6 h-6 text-[#a1a1aa]" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">23</div>
              </div>
              <span className="text-xs text-[#71717a]">Notifications</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#3f3f46]" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                <Layers className="w-6 h-6 text-[#a1a1aa]" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">6</div>
              </div>
              <span className="text-xs text-[#71717a]">Repositories</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#3f3f46]" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                <GitPullRequest className="w-6 h-6 text-[#a1a1aa]" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">6</div>
              </div>
              <span className="text-xs text-[#71717a]">Pull Requests</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#3f3f46]" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                <MessageSquare className="w-6 h-6 text-[#a1a1aa]" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">5</div>
              </div>
              <span className="text-xs text-[#71717a]">Mentions</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#3f3f46]" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold text-xl">
                ?
              </div>
              <span className="text-xs text-red-400 font-medium text-center leading-tight">Where do<br/>I start?</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why GitTower (Comparison) */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-4">
            <div className="text-purple-400 text-sm font-semibold mb-3">Why GitTower</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#71717a] mb-2 leading-tight">GitHub tells you what happened.</h2>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">GitTower tells you what to do.</h2>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row items-stretch gap-6 w-full">
            
            {/* GitHub Card */}
            <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">GitHub</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#a1a1aa]">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Sarah commented</span>
                </div>
                <div className="flex items-center gap-4 text-[#a1a1aa]">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <Search className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-sm">Review requested</span>
                </div>
                <div className="flex items-center gap-4 text-[#a1a1aa]">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-sm">CI passed</span>
                </div>
                <div className="flex items-center gap-4 text-[#a1a1aa]">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Activity className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Mentioned you</span>
                </div>
                <div className="flex items-center gap-4 text-[#a1a1aa]">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-white font-bold">!</span>
                  </div>
                  <span className="text-sm">14 notifications</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col justify-center gap-6">
              {[1,2,3,4,5].map(i => <ArrowRight key={i} className="w-4 h-4 text-[#3f3f46]" />)}
            </div>

            {/* GitTower Card */}
            <div className="flex-1 bg-[#050505] border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.05)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full pointer-events-none" />
              <h3 className="text-lg font-semibold text-purple-400 mb-6">GitTower</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">Sarah is waiting for your reply</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Search className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">Needs your review</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <GitMerge className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">Ready to merge</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Activity className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">Conversation waiting</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-purple-400">3 things need your attention</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-purple-400 text-sm font-semibold mb-8">Everything you need in one place</div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                <Inbox className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">One inbox for everything</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6 flex-1">
                PRs, issues, mentions, reviews, and discussions—unified in one intelligent inbox.
              </p>
              <div className="border border-white/5 bg-[#0a0a0a] rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-white"><span>Needs Me</span><span className="px-1 bg-red-500/20 text-red-400 rounded">7</span></div>
                <div className="flex items-center justify-between text-xs text-[#a1a1aa]"><span>Waiting</span><span className="px-1 bg-white/10 rounded">11</span></div>
                <div className="flex items-center justify-between text-xs text-[#a1a1aa]"><span>Following</span><span className="px-1 bg-white/10 rounded">18</span></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI that understands context</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6 flex-1">
                Summaries, decisions, open questions, and blockers—so you spend less time reading.
              </p>
              <div className="border border-white/5 bg-[#0a0a0a] rounded-lg p-3 space-y-2">
                <div className="text-[10px] font-bold text-[#52525b] uppercase">AI Summary</div>
                <div className="flex gap-2 items-start text-xs text-white"><div className="w-1 h-1 rounded-full bg-white mt-1.5 shrink-0" />Issue caused by race condition</div>
                <div className="flex gap-2 items-start text-xs text-white"><div className="w-1 h-1 rounded-full bg-white mt-1.5 shrink-0" />Fix proposed in #6201</div>
                <div className="flex gap-2 items-start text-xs text-purple-400"><div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 shrink-0" />Needs review from @you</div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Review faster</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6 flex-1">
                See code, discussion, timeline, and review status together. No more tab switching.
              </p>
              <div className="border border-white/5 bg-[#0a0a0a] rounded-lg p-3 space-y-1 font-mono text-[10px]">
                <div className="text-[#a1a1aa]">@@ -1,3 +1,3 @@</div>
                <div className="text-red-400 bg-red-500/10 px-1">- old_function()</div>
                <div className="text-green-400 bg-green-500/10 px-1">+ new_function()</div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                <Zap className="w-5 h-5 text-purple-400" fill="currentColor" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Focus on what matters</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6 flex-1">
                Prioritize your work by attention, not by repository. Ship more, stress less.
              </p>
              <div className="border border-white/5 bg-[#0a0a0a] rounded-lg p-3 space-y-2 mt-auto">
                <div className="flex items-center justify-between text-xs text-white"><span>Needs Me</span><span className="px-1 bg-red-500/20 text-red-400 rounded">7</span></div>
                <div className="flex items-center justify-between text-xs text-[#a1a1aa]"><span>Done</span><span className="px-1 bg-green-500/20 text-green-400 rounded">12</span></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">Stop searching GitHub.<br/>Start organizing your work.</h2>
          <button 
            onClick={onConnect}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-500 transition-all text-lg shadow-[0_0_20px_rgba(147,51,234,0.4)] mx-auto mb-6"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
          <p className="text-[#a1a1aa] font-medium text-sm">Free forever. Open Source.</p>
        </div>
      </footer>
    </div>
  );
}
