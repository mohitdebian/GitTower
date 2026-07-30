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
    <div className="min-h-screen bg-[#1A1714] text-[#A09A90] font-sans overflow-x-hidden selection:bg-[#C4A882]/20 selection:text-[#E8E0D4]">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-[#2A2520] bg-[#1A1714]/90 backdrop-blur-md z-50 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#C4A882] flex items-center justify-center text-[#1A1714]">
            <Box className="w-5 h-5" />
          </div>
          <span className="font-semibold text-[#E8E0D4] text-lg tracking-tight">GitTower</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E685E]">
          <a href="#" className="text-[#E8E0D4] hover:text-[#C4A882] transition-colors">Features</a>
          <a href="#" className="hover:text-[#E8E0D4] transition-colors">How it Works</a>
          <a href="#" className="hover:text-[#E8E0D4] transition-colors">Roadmap</a>
          <a href="#" className="hover:text-[#E8E0D4] transition-colors">Docs</a>
          <a href="#" className="hover:text-[#E8E0D4] transition-colors">GitHub</a>
        </div>

        <button 
          onClick={onConnect}
          className="text-sm font-medium px-4 py-2 rounded-lg bg-[#C4A882] hover:bg-[#D4B892] transition-colors text-[#1A1714] flex items-center gap-2"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2520] border border-[#3A3430] text-[#C4A882] text-xs font-medium mb-8">
              <Heart className="w-3 h-3" />
              Free forever. Open Source.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#E8E0D4] tracking-tight leading-[1.15] mb-6">
              GitHub organizes repositories.<br/>
              <span className="text-[#C4A882]">GitTower organizes your work.</span>
            </h1>
            <p className="text-lg text-[#8A8478] leading-relaxed mb-10 max-w-xl">
              Pull requests, issues, reviews, mentions, and discussions—all in one place. Know exactly what needs your attention and ship your best work.
            </p>
            <div className="flex flex-col items-start gap-4">
              <button 
                onClick={onConnect}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C4A882] hover:bg-[#D4B892] text-[#1A1714] font-medium rounded-xl transition-colors text-lg group"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-[#6E685E] font-medium tracking-wide pl-2">
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
            <div className="rounded-2xl border border-[#2A2520] bg-[#141210] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[480px]">
              
              {/* Mockup Sidebar */}
              <div className="w-full md:w-52 border-r border-[#2A2520] bg-[#1A1714] p-4 hidden md:flex flex-col gap-5 shrink-0">
                <div className="flex items-center gap-2 mb-1 px-1">
                   <Box className="w-5 h-5 text-[#C4A882]" />
                   <span className="text-[#E8E0D4] font-semibold text-sm">GitTower</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#6E685E] hover:bg-[#222018] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><LayoutTemplate className="w-4 h-4" /> Home</div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#C4A882]/10 text-[#C4A882] cursor-pointer text-sm font-medium">
                    <div className="flex items-center gap-3"><Inbox className="w-4 h-4" /> Needs Me</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C4A882]/20 text-[#C4A882]">7</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#6E685E] hover:bg-[#222018] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><Activity className="w-4 h-4" /> Waiting</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2A2520] text-[#8A8478]">11</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#6E685E] hover:bg-[#222018] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><Search className="w-4 h-4" /> Following</div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2A2520] text-[#8A8478]">18</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg text-[#6E685E] hover:bg-[#222018] cursor-pointer text-sm">
                    <div className="flex items-center gap-3"><Check className="w-4 h-4" /> Done</div>
                  </div>
                </div>

                <div className="mt-auto space-y-1">
                  <div className="text-[11px] font-bold text-[#4A4438] uppercase tracking-wider px-2 mb-2">Repos</div>
                  <div className="flex items-center gap-2 px-2 text-[#6E685E] text-xs"><div className="w-3 h-3 rounded-full bg-[#2A2520]" /> facebook/react</div>
                  <div className="flex items-center gap-2 px-2 text-[#6E685E] text-xs"><div className="w-3 h-3 rounded-full bg-[#2A2520]" /> rust-lang/rust</div>
                  <div className="flex items-center gap-2 px-2 text-[#6E685E] text-xs"><div className="w-3 h-3 rounded-full bg-[#2A2520]" /> vercel/next.js</div>
                </div>
              </div>
              
              {/* Mockup Content */}
              <div className="flex-1 bg-[#141210] flex flex-col">
                <div className="h-12 border-b border-[#2A2520] px-5 flex items-center">
                  <div className="w-full max-w-xs h-7 bg-[#1A1714] border border-[#2A2520] rounded-md flex items-center px-3">
                    <Search className="w-3 h-3 text-[#4A4438] mr-2" />
                    <span className="text-xs text-[#4A4438]">Search...</span>
                  </div>
                </div>
                
                <div className="flex-1 p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[#E8E0D4] font-semibold text-sm flex items-center gap-2">
                      Needs Me <span className="w-5 h-5 rounded-full bg-[#C4A882] text-[#1A1714] text-[10px] flex items-center justify-center font-bold">7</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1714] border border-[#2A2520]">
                      <div className="w-7 h-7 rounded-full bg-[#2A2520] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#E8E0D4] truncate">Review React PR</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-[#C4A882]/10 text-[#C4A882] border border-[#C4A882]/20 font-medium">PR</span>
                          <span className="text-[10px] text-[#4A4438]">facebook/react</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#4A4438] shrink-0">5m</span>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1714] border border-[#2A2520]">
                      <div className="w-7 h-7 rounded-full bg-[#2A2520] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#E8E0D4] truncate">Reply to discussion</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-[#7A9EC4]/10 text-[#7A9EC4] border border-[#7A9EC4]/20 font-medium">DISC</span>
                          <span className="text-[10px] text-[#4A4438]">rust-lang/rust</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#4A4438] shrink-0">30m</span>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1714] border border-[#2A2520]">
                      <div className="w-7 h-7 rounded-full bg-[#2A2520] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#E8E0D4] truncate">CI passed — Ready to merge</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-[#8AAF7A]/10 text-[#8AAF7A] border border-[#8AAF7A]/20 font-medium">PR</span>
                          <span className="text-[10px] text-[#4A4438]">vercel/next.js</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#4A4438] shrink-0">1h</span>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1714] border border-[#2A2520]">
                      <div className="w-7 h-7 rounded-full bg-[#2A2520] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#E8E0D4] truncate">Answer maintainer question</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] px-1 py-0.5 rounded bg-[#C49A6E]/10 text-[#C49A6E] border border-[#C49A6E]/20 font-medium">ISSUE</span>
                          <span className="text-[10px] text-[#4A4438]">pixijs/pixi.js</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#4A4438] shrink-0">2h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 2. The Problem */}
      <section className="py-28 bg-[#141210]">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#C4A882] text-sm font-semibold mb-3 uppercase tracking-wider">The problem</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E8E0D4] mb-6 leading-tight">Your work is everywhere.<br/>Your focus shouldn't be.</h2>
            <p className="text-[#8A8478] text-lg leading-relaxed max-w-md">
              Juggling multiple repositories, notifications, and conversations makes it hard to stay focused and ship your best work.
            </p>
          </div>
          
          {/* Flowchart */}
          <div className="bg-[#1A1714] border border-[#2A2520] rounded-2xl p-8 flex items-center justify-between">
            {[
              { icon: Github, label: "Notifications", count: "23" },
              { icon: Layers, label: "Repos", count: "6" },
              { icon: GitPullRequest, label: "PRs", count: "6" },
              { icon: MessageSquare, label: "Mentions", count: "5" },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ArrowRight className="w-4 h-4 text-[#2A2520] shrink-0 hidden sm:block" />}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-full bg-[#222018] border border-[#2A2520] flex items-center justify-center relative">
                    <item.icon className="w-5 h-5 text-[#6E685E]" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#B5705A] rounded-full flex items-center justify-center text-[9px] text-white font-bold">{item.count}</div>
                  </div>
                  <span className="text-[10px] text-[#6E685E] text-center">{item.label}</span>
                </div>
              </React.Fragment>
            ))}
            <ArrowRight className="w-4 h-4 text-[#2A2520] shrink-0 hidden sm:block" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-[#B5705A]/10 border border-[#B5705A]/20 flex items-center justify-center text-[#B5705A] font-bold text-lg">
                ?
              </div>
              <span className="text-[10px] text-[#B5705A] font-medium text-center leading-tight">Where do<br/>I start?</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why GitTower (Comparison) */}
      <section className="py-28 bg-[#1A1714]">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-4">
            <div className="text-[#C4A882] text-sm font-semibold mb-3 uppercase tracking-wider">Why GitTower</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#6E685E] mb-2 leading-tight">GitHub tells you what happened.</h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E8E0D4] leading-tight">GitTower tells you what to do.</h2>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row items-stretch gap-6 w-full">
            
            {/* GitHub Card */}
            <div className="flex-1 bg-[#141210] border border-[#2A2520] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#E8E0D4] mb-6">GitHub</h3>
              <div className="space-y-5">
                {[
                  { icon: MessageSquare, text: "Sarah commented" },
                  { icon: Search, text: "Review requested" },
                  { icon: Check, text: "CI passed" },
                  { icon: Activity, text: "Mentioned you" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#8A8478]">
                    <div className="w-6 h-6 rounded-full bg-[#222018] flex items-center justify-center shrink-0">
                      <item.icon className="w-3 h-3 text-[#6E685E]" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-4 text-[#8A8478]">
                  <div className="w-6 h-6 rounded-full bg-[#B5705A] flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-white font-bold">!</span>
                  </div>
                  <span className="text-sm">14 notifications</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col justify-center gap-5">
              {[1,2,3,4,5].map(i => <ArrowRight key={i} className="w-4 h-4 text-[#2A2520]" />)}
            </div>

            {/* GitTower Card */}
            <div className="flex-1 bg-[#C4A882]/5 border border-[#C4A882]/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#C4A882] mb-6">GitTower</h3>
              <div className="space-y-5">
                {[
                  { icon: MessageSquare, text: "Sarah is waiting for your reply" },
                  { icon: Search, text: "Needs your review" },
                  { icon: GitMerge, text: "Ready to merge" },
                  { icon: Activity, text: "Conversation waiting" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#E8E0D4]">
                    <div className="w-6 h-6 rounded-full bg-[#C4A882]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-3 h-3 text-[#C4A882]" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-4 text-[#C4A882]">
                  <div className="w-6 h-6 rounded-full bg-[#C4A882] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#1A1714]" />
                  </div>
                  <span className="text-sm font-bold">3 things need your attention</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Before vs After */}
      <section className="py-28 bg-[#141210]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#C4A882] text-sm font-semibold mb-3 uppercase tracking-wider">Before vs After</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1A1714] border border-[#2A2520] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#E8E0D4] mb-6 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B5705A]" />
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
                  <div key={i} className="p-3 bg-[#141210] border border-[#2A2520] rounded-lg flex justify-between text-[#6E685E]">
                    <span>{item.label}</span> <span className="text-[#E8E0D4] font-semibold">{item.val}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-[#B5705A] font-medium bg-[#B5705A]/5 py-3 rounded-lg border border-[#B5705A]/10">
                "Where do I start?"
              </p>
            </div>

            <div className="bg-[#C4A882]/5 border border-[#C4A882]/20 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#E8E0D4] mb-6 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8AAF7A]" />
                After GitTower
              </h3>
              <div className="text-xs font-bold text-[#6E685E] uppercase tracking-wider mb-4">Needs Me (4)</div>
              <div className="space-y-4">
                {["Review React PR", "Reply to Sarah", "Merge Payment Fix", "Answer maintainer"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#E8E0D4]">
                    <Check className="w-5 h-5 text-[#8AAF7A]" /> {text}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-[#8AAF7A] font-bold text-lg">
                ✓ Done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Grid */}
      <section className="py-28 bg-[#1A1714]">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          <div className="text-[#C4A882] text-sm font-semibold mb-3 uppercase tracking-wider">Everything you need in one place</div>
          <h2 className="text-3xl font-bold text-[#E8E0D4] mb-12">Built for how developers actually work.</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Inbox, title: "One inbox", desc: "PRs, issues, mentions, reviews, and discussions in one intelligent inbox." },
              { icon: Zap, title: "AI summaries", desc: "Decisions, open questions, and blockers summarized so you spend less time reading." },
              { icon: Code, title: "Review faster", desc: "See code, discussion, timeline, and status together. No tab switching." },
              { icon: Activity, title: "Attention first", desc: "Work organized by priority, not by repository. Ship more, stress less." },
            ].map((feature, i) => (
              <div key={i} className="bg-[#141210] border border-[#2A2520] rounded-2xl p-6 flex flex-col hover:border-[#3A3430] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#222018] flex items-center justify-center mb-6">
                  <feature.icon className="w-5 h-5 text-[#C4A882]" />
                </div>
                <h3 className="text-base font-bold text-[#E8E0D4] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#8A8478] leading-relaxed flex-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Built For */}
      <section className="py-28 bg-[#141210]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#C4A882] text-sm font-semibold mb-3 uppercase tracking-wider">Built for</div>
            <h2 className="text-3xl font-bold text-[#E8E0D4]">Developers who ship.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Open Source Contributors", desc: "Contribute to multiple projects without losing track.", color: "text-[#7A9EC4]" },
              { icon: Users, title: "Maintainers", desc: "Know what needs your review and what can wait.", color: "text-[#C4A882]" },
              { icon: Layers, title: "Engineering Teams", desc: "Stay on top of discussions, reviews, and decisions.", color: "text-[#A07AAF]" },
              { icon: Box, title: "Indie Developers", desc: "Manage personal projects without tab overload.", color: "text-[#8AAF7A]" },
            ].map((item, i) => (
              <div key={i} className="bg-[#1A1714] border border-[#2A2520] rounded-2xl p-6">
                <item.icon className={`w-7 h-7 mb-4 ${item.color}`} />
                <h3 className="text-base font-bold text-[#E8E0D4] mb-2">{item.title}</h3>
                <p className="text-sm text-[#8A8478]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Open Source */}
      <section className="py-20 bg-[#1A1714]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#E8E0D4] mb-8">Built for developers.</h2>
          <div className="flex flex-wrap justify-center gap-6 text-base font-medium text-[#E8E0D4] mb-4">
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#8AAF7A]" /> Free forever.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#8AAF7A]" /> Open source.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#8AAF7A]" /> Community driven.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#6E685E]">
            <span>No subscriptions.</span>
            <span>No feature paywalls.</span>
            <span>No artificial limits.</span>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-28 bg-[#C4A882]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A1714] tracking-tight mb-4">Stop searching GitHub.</h2>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A1714]/60 tracking-tight mb-10">Start organizing your work.</h2>
          <button 
            onClick={onConnect}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1714] text-[#E8E0D4] font-semibold rounded-xl hover:bg-[#2A2520] transition-colors text-lg mx-auto mb-4"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
          <p className="text-[#1A1714]/60 font-medium text-sm">Free forever. Open Source.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#141210] border-t border-[#2A2520]">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#C4A882] rounded flex items-center justify-center text-[#1A1714]"><Box className="w-4 h-4" /></div>
              <span className="font-semibold text-[#E8E0D4]">GitTower</span>
            </div>
            <p className="text-sm text-[#6E685E]">The GitHub command center for developers.</p>
          </div>
          
          <div>
            <h4 className="text-[#E8E0D4] font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-[#6E685E]">
              <li><a href="#" className="hover:text-[#C4A882]">Features</a></li>
              <li><a href="#" className="hover:text-[#C4A882]">Roadmap</a></li>
              <li><a href="#" className="hover:text-[#C4A882]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#C4A882]">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#E8E0D4] font-semibold mb-4 text-sm">Community</h4>
            <ul className="space-y-2 text-sm text-[#6E685E]">
              <li><a href="#" className="hover:text-[#C4A882]">GitHub</a></li>
              <li><a href="#" className="hover:text-[#C4A882]">Discord</a></li>
              <li><a href="#" className="hover:text-[#C4A882]">Discussions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#E8E0D4] font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-[#6E685E]">
              <li><a href="#" className="hover:text-[#C4A882]">Blog</a></li>
              <li><a href="#" className="hover:text-[#C4A882]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#C4A882]">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
