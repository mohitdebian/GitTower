import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
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
  LayoutTemplate,
  ArrowDown
} from 'lucide-react';

export default function LandingPage({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#5C5652] font-sans overflow-x-hidden selection:bg-[#C4A882]/30 selection:text-[#2C2825]">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-[#E0D8CF] bg-[#F5F0EB]/90 backdrop-blur-md z-50 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2C2825] flex items-center justify-center text-[#F5F0EB]">
            <Box className="w-5 h-5" />
          </div>
          <span className="font-semibold text-[#2C2825] text-lg tracking-tight">GitTower</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8A8280]">
          <a href="#" className="text-[#2C2825] hover:text-[#C4A882] transition-colors">Features</a>
          <a href="#" className="hover:text-[#2C2825] transition-colors">How it Works</a>
          <a href="#" className="hover:text-[#2C2825] transition-colors">Roadmap</a>
          <a href="#" className="hover:text-[#2C2825] transition-colors">Docs</a>
          <a href="#" className="hover:text-[#2C2825] transition-colors">GitHub</a>
        </div>

        <button 
          onClick={onConnect}
          className="text-sm font-medium px-4 py-2 rounded-lg bg-[#2C2825] hover:bg-[#3D3835] transition-colors text-[#F5F0EB] flex items-center gap-2"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">Sign in with GitHub</span>
          <span className="sm:hidden">Sign in</span>
        </button>
      </nav>

      {/* 1. Hero Section */}
      <main className="pt-32 pb-24 px-6 lg:px-12 max-w-[1300px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Left */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE6DD] border border-[#DDD4C8] text-[#8A7560] text-xs font-medium mb-8">
              <Heart className="w-3 h-3" />
              Free forever. Open Source.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#2C2825] tracking-tight leading-[1.15] mb-6">
              GitHub organizes repositories.<br/>
              <span className="text-[#A0845E]">GitTower organizes your work.</span>
            </h1>
            <p className="text-lg text-[#7A7472] leading-relaxed mb-10 max-w-xl">
              Pull requests, issues, reviews, mentions, and discussions—all in one place. Know exactly what needs your attention and ship your best work.
            </p>
            <div className="flex flex-col items-start gap-4">
              <button 
                onClick={onConnect}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C2825] hover:bg-[#3D3835] text-[#F5F0EB] font-medium rounded-xl transition-colors text-lg group"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-[#A09C98] font-medium tracking-wide pl-2">
                No setup required. Start in seconds.
              </p>
            </div>
          </motion.div>

          {/* Hero Right Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl border border-[#DDD4C8] bg-white shadow-xl overflow-hidden flex flex-col md:flex-row h-[480px]">
              
              {/* Mockup Sidebar */}
              <div className="w-full md:w-52 border-r border-[#EDE6DD] bg-[#FAF7F4] p-4 hidden md:flex flex-col gap-5 shrink-0">
                <div className="flex items-center gap-2 mb-1 px-1">
                   <Box className="w-5 h-5 text-[#A0845E]" />
                   <span className="text-[#2C2825] font-semibold text-sm">GitTower</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#8A8280] hover:bg-[#EDE6DD] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><LayoutTemplate className="w-4 h-4" /> Home</div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#2C2825] text-[#F5F0EB] cursor-pointer text-sm font-medium">
                    <div className="flex items-center gap-3"><Inbox className="w-4 h-4" /> Needs Me</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#A0845E] text-white">7</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#8A8280] hover:bg-[#EDE6DD] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><Activity className="w-4 h-4" /> Waiting</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EDE6DD] text-[#7A7472]">11</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#8A8280] hover:bg-[#EDE6DD] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><Search className="w-4 h-4" /> Following</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EDE6DD] text-[#7A7472]">18</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#8A8280] hover:bg-[#EDE6DD] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><Check className="w-4 h-4" /> Done</div>
                  </div>
                </div>

                <div className="mt-auto space-y-1">
                  <div className="text-[11px] font-bold text-[#B0ACA8] uppercase tracking-wider px-2 mb-2">Repos</div>
                  <div className="flex items-center gap-2 px-2 text-[#8A8280] text-xs"><div className="w-3 h-3 rounded-full bg-[#DDD4C8]" /> facebook/react</div>
                  <div className="flex items-center gap-2 px-2 text-[#8A8280] text-xs"><div className="w-3 h-3 rounded-full bg-[#DDD4C8]" /> rust-lang/rust</div>
                  <div className="flex items-center gap-2 px-2 text-[#8A8280] text-xs"><div className="w-3 h-3 rounded-full bg-[#DDD4C8]" /> vercel/next.js</div>
                </div>
              </div>
              
              {/* Mockup Content */}
              <div className="flex-1 bg-white flex flex-col">
                <div className="h-12 border-b border-[#EDE6DD] px-5 flex items-center">
                  <div className="w-full max-w-xs h-7 bg-[#FAF7F4] border border-[#EDE6DD] rounded-md flex items-center px-3">
                    <Search className="w-3 h-3 text-[#B0ACA8] mr-2" />
                    <span className="text-xs text-[#B0ACA8]">Search...</span>
                  </div>
                </div>
                
                <div className="flex-1 p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[#2C2825] font-semibold text-sm flex items-center gap-2">
                      Needs Me <span className="w-5 h-5 rounded-full bg-[#A0845E] text-white text-[10px] flex items-center justify-center font-bold">7</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F4] border border-[#EDE6DD]">
                      <div className="w-7 h-7 rounded-full bg-[#E0D8CF] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#2C2825] truncate">Review React PR</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-[#A0845E]/10 text-[#A0845E] border border-[#A0845E]/20 font-medium">PR</span>
                          <span className="text-[10px] text-[#B0ACA8]">facebook/react</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#B0ACA8] shrink-0">5m</span>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F4] border border-[#EDE6DD]">
                      <div className="w-7 h-7 rounded-full bg-[#E0D8CF] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#2C2825] truncate">Reply to discussion</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-blue-500/10 text-blue-600 border border-blue-500/20 font-medium">DISC</span>
                          <span className="text-[10px] text-[#B0ACA8]">rust-lang/rust</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#B0ACA8] shrink-0">30m</span>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F4] border border-[#EDE6DD]">
                      <div className="w-7 h-7 rounded-full bg-[#E0D8CF] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#2C2825] truncate">CI passed — Ready to merge</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-green-500/10 text-green-700 border border-green-500/20 font-medium">PR</span>
                          <span className="text-[10px] text-[#B0ACA8]">vercel/next.js</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#B0ACA8] shrink-0">1h</span>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F4] border border-[#EDE6DD]">
                      <div className="w-7 h-7 rounded-full bg-[#E0D8CF] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#2C2825] truncate">Answer maintainer question</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-orange-500/10 text-orange-600 border border-orange-500/20 font-medium">ISSUE</span>
                          <span className="text-[10px] text-[#B0ACA8]">pixijs/pixi.js</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#B0ACA8] shrink-0">2h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 2. The Problem */}
      <section className="py-28 bg-[#EDE6DD]">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#A0845E] text-sm font-semibold mb-3 uppercase tracking-wider">The problem</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2825] mb-6 leading-tight">Your work is everywhere.<br/>Your focus shouldn't be.</h2>
            <p className="text-[#7A7472] text-lg leading-relaxed max-w-md">
              Juggling multiple repositories, notifications, and conversations makes it hard to stay focused and ship your best work.
            </p>
          </div>
          
          {/* Flowchart */}
          <div className="bg-white border border-[#DDD4C8] rounded-2xl p-8 flex items-center justify-between">
            {[
              { icon: Github, label: "Notifications", count: "23" },
              { icon: Layers, label: "Repos", count: "6" },
              { icon: GitPullRequest, label: "PRs", count: "6" },
              { icon: MessageSquare, label: "Mentions", count: "5" },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ArrowRight className="w-4 h-4 text-[#DDD4C8] shrink-0 hidden sm:block" />}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-full bg-[#FAF7F4] border border-[#E0D8CF] flex items-center justify-center relative">
                    <item.icon className="w-5 h-5 text-[#8A8280]" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C4705A] rounded-full flex items-center justify-center text-[9px] text-white font-bold">{item.count}</div>
                  </div>
                  <span className="text-[10px] text-[#8A8280] text-center">{item.label}</span>
                </div>
              </React.Fragment>
            ))}
            <ArrowRight className="w-4 h-4 text-[#DDD4C8] shrink-0 hidden sm:block" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-[#C4705A]/10 border border-[#C4705A]/20 flex items-center justify-center text-[#C4705A] font-bold text-lg">
                ?
              </div>
              <span className="text-[10px] text-[#C4705A] font-medium text-center leading-tight">Where do<br/>I start?</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why GitTower (Comparison) */}
      <section className="py-28 bg-[#F5F0EB]">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-4">
            <div className="text-[#A0845E] text-sm font-semibold mb-3 uppercase tracking-wider">Why GitTower</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#B0ACA8] mb-2 leading-tight">GitHub tells you what happened.</h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2825] leading-tight">GitTower tells you what to do.</h2>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row items-stretch gap-6 w-full">
            
            {/* GitHub Card */}
            <div className="flex-1 bg-white border border-[#DDD4C8] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#2C2825] mb-6">GitHub</h3>
              <div className="space-y-5">
                {[
                  { icon: MessageSquare, text: "Sarah commented", color: "text-[#8A8280]", bg: "bg-[#EDE6DD]" },
                  { icon: Search, text: "Review requested", color: "text-[#C4705A]", bg: "bg-[#C4705A]/10" },
                  { icon: Check, text: "CI passed", color: "text-green-700", bg: "bg-green-100" },
                  { icon: Activity, text: "Mentioned you", color: "text-[#8A8280]", bg: "bg-[#EDE6DD]" },
                  { icon: Inbox, text: "14 notifications", color: "text-[#C4705A]", bg: "bg-[#C4705A]" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#7A7472]">
                    <div className={`w-6 h-6 rounded-full ${i === 4 ? 'bg-[#C4705A]' : item.bg} flex items-center justify-center shrink-0`}>
                      {i === 4 ? <span className="text-[10px] text-white font-bold">!</span> : <item.icon className={`w-3 h-3 ${item.color}`} />}
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex flex-col justify-center gap-5">
              {[1,2,3,4,5].map(i => <ArrowRight key={i} className="w-4 h-4 text-[#DDD4C8]" />)}
            </div>

            {/* GitTower Card */}
            <div className="flex-1 bg-[#2C2825] border border-[#3D3835] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#C4A882] mb-6">GitTower</h3>
              <div className="space-y-5">
                {[
                  { icon: MessageSquare, text: "Sarah is waiting for your reply" },
                  { icon: Search, text: "Needs your review" },
                  { icon: GitMerge, text: "Ready to merge" },
                  { icon: Activity, text: "Conversation waiting" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#E0D8CF]">
                    <div className="w-6 h-6 rounded-full bg-[#C4A882]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-3 h-3 text-[#C4A882]" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-4 text-[#C4A882]">
                  <div className="w-6 h-6 rounded-full bg-[#C4A882] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#2C2825]" />
                  </div>
                  <span className="text-sm font-bold">3 things need your attention</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Before vs After */}
      <section className="py-28 bg-[#EDE6DD]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#A0845E] text-sm font-semibold mb-3 uppercase tracking-wider">Before vs After</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#DDD4C8] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#2C2825] mb-6 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C4705A]" />
                Before GitTower
              </h3>
              <div className="space-y-3 font-mono text-sm">
                {[
                  { label: "Notifications", val: "23" },
                  { label: "Browser Tabs", val: "9" },
                  { label: "Repositories", val: "6" },
                  { label: "Review Requests", val: "4" },
                  { label: "Mentions", val: "3" },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-[#FAF7F4] border border-[#EDE6DD] rounded-lg flex justify-between text-[#7A7472]">
                    <span>{item.label}</span> <span className="text-[#2C2825] font-semibold">{item.val}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-[#C4705A] font-medium bg-[#C4705A]/5 py-3 rounded-lg border border-[#C4705A]/10">
                "Where do I start?"
              </p>
            </div>

            <div className="bg-[#2C2825] border border-[#3D3835] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#E0D8CF] mb-6 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8AB07A]" />
                After GitTower
              </h3>
              <div className="text-xs font-bold text-[#8A8280] uppercase tracking-wider mb-4">Needs Me (4)</div>
              <div className="space-y-4">
                {["Review React PR", "Reply to Sarah", "Merge Payment Fix", "Answer maintainer"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#E0D8CF]">
                    <Check className="w-5 h-5 text-[#8AB07A]" /> {text}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-[#8AB07A] font-bold text-lg">
                ✓ Done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Grid */}
      <section className="py-28 bg-[#F5F0EB]">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          <div className="text-[#A0845E] text-sm font-semibold mb-3 uppercase tracking-wider">Everything you need in one place</div>
          <h2 className="text-3xl font-bold text-[#2C2825] mb-12">Built for how developers actually work.</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border border-[#DDD4C8] rounded-2xl p-6 flex flex-col hover:border-[#C4A882] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EDE6DD] flex items-center justify-center mb-6">
                <Inbox className="w-5 h-5 text-[#A0845E]" />
              </div>
              <h3 className="text-base font-bold text-[#2C2825] mb-2">One inbox</h3>
              <p className="text-sm text-[#7A7472] leading-relaxed flex-1">
                PRs, issues, mentions, reviews, and discussions in one intelligent inbox.
              </p>
            </div>

            <div className="bg-white border border-[#DDD4C8] rounded-2xl p-6 flex flex-col hover:border-[#C4A882] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EDE6DD] flex items-center justify-center mb-6">
                <Zap className="w-5 h-5 text-[#A0845E]" />
              </div>
              <h3 className="text-base font-bold text-[#2C2825] mb-2">AI summaries</h3>
              <p className="text-sm text-[#7A7472] leading-relaxed flex-1">
                Decisions, open questions, and blockers summarized so you spend less time reading.
              </p>
            </div>

            <div className="bg-white border border-[#DDD4C8] rounded-2xl p-6 flex flex-col hover:border-[#C4A882] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EDE6DD] flex items-center justify-center mb-6">
                <Code className="w-5 h-5 text-[#A0845E]" />
              </div>
              <h3 className="text-base font-bold text-[#2C2825] mb-2">Review faster</h3>
              <p className="text-sm text-[#7A7472] leading-relaxed flex-1">
                See code, discussion, timeline, and status together. No tab switching.
              </p>
            </div>

            <div className="bg-white border border-[#DDD4C8] rounded-2xl p-6 flex flex-col hover:border-[#C4A882] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EDE6DD] flex items-center justify-center mb-6">
                <Activity className="w-5 h-5 text-[#A0845E]" />
              </div>
              <h3 className="text-base font-bold text-[#2C2825] mb-2">Attention first</h3>
              <p className="text-sm text-[#7A7472] leading-relaxed flex-1">
                Work organized by priority, not by repository. Ship more, stress less.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Built For */}
      <section className="py-28 bg-[#EDE6DD]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#A0845E] text-sm font-semibold mb-3 uppercase tracking-wider">Built for</div>
            <h2 className="text-3xl font-bold text-[#2C2825]">Developers who ship.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Open Source Contributors", desc: "Contribute to multiple projects without losing track.", color: "text-blue-600" },
              { icon: Users, title: "Maintainers", desc: "Know what needs your review and what can wait.", color: "text-[#A0845E]" },
              { icon: Layers, title: "Engineering Teams", desc: "Stay on top of discussions, reviews, and decisions.", color: "text-[#8957e5]" },
              { icon: Box, title: "Indie Developers", desc: "Manage personal projects without tab overload.", color: "text-[#8AB07A]" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#DDD4C8] rounded-2xl p-6">
                <item.icon className={`w-7 h-7 mb-4 ${item.color}`} />
                <h3 className="text-base font-bold text-[#2C2825] mb-2">{item.title}</h3>
                <p className="text-sm text-[#7A7472]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Open Source */}
      <section className="py-20 bg-[#F5F0EB]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#2C2825] mb-8">Built for developers.</h2>
          <div className="flex flex-wrap justify-center gap-6 text-base font-medium text-[#2C2825] mb-4">
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#8AB07A]" /> Free forever.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#8AB07A]" /> Open source.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#8AB07A]" /> Community driven.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#8A8280]">
            <span>No subscriptions.</span>
            <span>No feature paywalls.</span>
            <span>No artificial limits.</span>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-28 bg-[#2C2825]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F5F0EB] tracking-tight mb-4">Stop searching GitHub.</h2>
          <h2 className="text-3xl md:text-5xl font-bold text-[#C4A882] tracking-tight mb-10">Start organizing your work.</h2>
          <button 
            onClick={onConnect}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F5F0EB] text-[#2C2825] font-semibold rounded-xl hover:bg-white transition-colors text-lg mx-auto mb-4"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
          <p className="text-[#8A8280] font-medium text-sm">Free forever. Open Source.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#F5F0EB] border-t border-[#DDD4C8]">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#2C2825] rounded flex items-center justify-center text-[#F5F0EB]"><Box className="w-4 h-4" /></div>
              <span className="font-semibold text-[#2C2825]">GitTower</span>
            </div>
            <p className="text-sm text-[#8A8280]">The GitHub command center for developers.</p>
          </div>
          
          <div>
            <h4 className="text-[#2C2825] font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-[#8A8280]">
              <li><a href="#" className="hover:text-[#A0845E]">Features</a></li>
              <li><a href="#" className="hover:text-[#A0845E]">Roadmap</a></li>
              <li><a href="#" className="hover:text-[#A0845E]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#A0845E]">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#2C2825] font-semibold mb-4 text-sm">Community</h4>
            <ul className="space-y-2 text-sm text-[#8A8280]">
              <li><a href="#" className="hover:text-[#A0845E]">GitHub</a></li>
              <li><a href="#" className="hover:text-[#A0845E]">Discord</a></li>
              <li><a href="#" className="hover:text-[#A0845E]">Discussions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#2C2825] font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-[#8A8280]">
              <li><a href="#" className="hover:text-[#A0845E]">Blog</a></li>
              <li><a href="#" className="hover:text-[#A0845E]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#A0845E]">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
