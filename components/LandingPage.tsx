import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, ArrowDown, Check, MessageSquare, GitPullRequest, Search, Zap, Layers, Users, Star, Box, Code, Filter, GitMerge, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LandingPage({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-x-hidden selection:bg-[#1f6feb]/30 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-md z-50 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-b from-[#238636] to-[#2ea043] rounded-md flex items-center justify-center text-white border border-[#3fb950]/50 shadow-sm">
            <Github className="w-5 h-5" />
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">GitTower</span>
        </div>
        <button 
          onClick={onConnect}
          className="text-sm font-medium px-4 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] transition-colors text-white"
        >
          Sign In
        </button>
      </nav>

      {/* 1. Hero */}
      <main className="pt-40 pb-24 px-6 lg:px-12 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            <span className="text-[#8b949e]">GitHub organizes repositories.</span><br />
            GitTower organizes your work.
          </h1>
          <p className="text-lg md:text-2xl text-[#8b949e] max-w-3xl mx-auto leading-relaxed mb-10">
            Stop jumping between repositories, notifications, pull requests, issues, and discussions.<br className="hidden md:block" />
            GitTower brings everything that needs your attention into one focused workspace, so you always know what to do next.
          </p>
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={onConnect}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 font-semibold rounded-full transition-all text-lg group"
            >
              Continue with GitHub 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-[#8b949e] font-medium tracking-wide">
              Free forever • Open Source • No setup required
            </p>
          </div>
        </motion.div>
      </main>

      {/* 2. Problem */}
      <section className="py-24 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your work isn't in one repository anymore.</h2>
          <p className="text-xl text-[#8b949e] mb-16">If you contribute to multiple projects, your day probably looks like this.</p>
          
          <div className="flex flex-col items-center font-mono text-sm">
            <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">React</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 bg-[#161b22] border border-[#3fb950]/30 text-[#3fb950] rounded-lg">Pull Request</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">Rust</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 bg-[#161b22] border border-[#f85149]/30 text-[#f85149] rounded-lg">Issue</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">QwenPaw</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 bg-[#161b22] border border-[#a371f7]/30 text-[#a371f7] rounded-lg">Discussion</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">Next.js</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 bg-[#161b22] border border-[#58a6ff]/30 text-[#58a6ff] rounded-lg">Mention</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 text-[#8b949e]">Another tab</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 text-[#8b949e]">Another notification</div>
            <ArrowDown className="w-4 h-4 text-[#8b949e] my-3" />
            <div className="px-6 py-3 font-semibold text-white bg-[#f85149]/10 border border-[#f85149]/20 rounded-lg">"What actually needs my attention?"</div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-white mb-2">Writing code isn't the difficult part anymore.</h3>
            <p className="text-[#8b949e] text-xl">Keeping up with everything is.</p>
          </div>
        </div>
      </section>

      {/* 3. The Problem in Real Life */}
      <section className="py-24 border-t border-[#30363d] bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Every morning starts with questions like:</h2>
          
          <div className="space-y-4 max-w-2xl mx-auto mb-16 text-lg text-[#c9d1d9]">
            <p className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">Did a maintainer reply to my pull request?</p>
            <p className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">Is someone waiting for my review?</p>
            <p className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">Which mention is actually urgent?</p>
            <p className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">Can this PR finally be merged?</p>
            <p className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">Which discussion still needs my response?</p>
            <p className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg font-semibold text-white border-white/20">What should I work on first?</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-[#8b949e] mb-2">GitHub gives you notifications.</p>
            <p className="text-3xl font-bold text-white">GitTower gives you answers.</p>
          </div>
        </div>
      </section>

      {/* 4. The Difference */}
      <section className="py-24 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-2xl text-[#8b949e] mb-2">GitHub tells you what happened.</p>
            <h2 className="text-3xl font-bold text-white">GitTower tells you what to do.</h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]">
            <table className="w-full text-left text-lg">
              <thead>
                <tr className="border-b border-[#30363d] bg-[#161b22]">
                  <th className="px-6 py-4 text-[#8b949e] font-medium w-1/2 border-r border-[#30363d]">GitHub</th>
                  <th className="px-6 py-4 text-white font-medium w-1/2 bg-[#1f6feb]/5">GitTower</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]">
                <tr>
                  <td className="px-6 py-4 text-[#c9d1d9] border-r border-[#30363d]">Sarah commented</td>
                  <td className="px-6 py-4 text-white font-medium bg-[#1f6feb]/5 flex items-center gap-3"><MessageSquare className="w-4 h-4 text-[#a371f7]" /> Sarah is waiting for your reply</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#c9d1d9] border-r border-[#30363d]">Review requested</td>
                  <td className="px-6 py-4 text-white font-medium bg-[#1f6feb]/5 flex items-center gap-3"><Search className="w-4 h-4 text-[#d29922]" /> Needs your review</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#c9d1d9] border-r border-[#30363d]">CI passed</td>
                  <td className="px-6 py-4 text-white font-medium bg-[#1f6feb]/5 flex items-center gap-3"><GitMerge className="w-4 h-4 text-[#3fb950]" /> Ready to merge</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#c9d1d9] border-r border-[#30363d]">Mentioned you</td>
                  <td className="px-6 py-4 text-white font-medium bg-[#1f6feb]/5 flex items-center gap-3"><Activity className="w-4 h-4 text-[#58a6ff]" /> Conversation waiting</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#8b949e] border-r border-[#30363d]">14 notifications</td>
                  <td className="px-6 py-4 text-[#3fb950] font-bold bg-[#1f6feb]/5 flex items-center gap-3"><CheckCircle2 className="w-4 h-4" /> 3 things need your attention</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Before vs After */}
      <section className="py-24 border-t border-[#30363d] bg-[#0d1117]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Before */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f85149]" />
                Before GitTower
              </h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded flex justify-between text-[#8b949e]"><span>Notifications</span> <span className="text-white">23</span></div>
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded flex justify-between text-[#8b949e]"><span>Browser Tabs</span> <span className="text-white">9</span></div>
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded flex justify-between text-[#8b949e]"><span>Repositories</span> <span className="text-white">6</span></div>
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded flex justify-between text-[#8b949e]"><span>Review Requests</span> <span className="text-white">4</span></div>
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded flex justify-between text-[#8b949e]"><span>Mentions</span> <span className="text-white">3</span></div>
              </div>
              <p className="mt-6 text-center text-[#f85149] font-medium bg-[#f85149]/10 py-3 rounded-lg border border-[#f85149]/20">
                "Where do I start?"
              </p>
            </div>

            {/* After */}
            <div className="bg-[#161b22] border border-[#3fb950]/30 rounded-2xl p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3fb950]/10 blur-[50px] rounded-full pointer-events-none" />
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3fb950]" />
                After GitTower
              </h3>
              <div className="space-y-4">
                <div className="text-sm font-bold text-[#8b949e] uppercase tracking-wider mb-2">Needs Me (4)</div>
                <div className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#3fb950]" /> Review React PR</div>
                <div className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#3fb950]" /> Reply to Sarah</div>
                <div className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#3fb950]" /> Merge Payment Fix</div>
                <div className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#3fb950]" /> Answer maintainer</div>
              </div>
              <p className="mt-8 text-center text-[#3fb950] font-bold text-lg">
                ✓ Done.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. One Workspace */}
      <section className="py-24 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Everything that needs your attention.</h2>
          <p className="text-xl text-[#8b949e] mb-16">Instead of organizing work by repositories… GitTower organizes it by attention.</p>
          
          <div className="max-w-md mx-auto text-left bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden mb-16">
            <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] font-bold text-xs uppercase tracking-widest text-[#8b949e]">
              Needs Me
            </div>
            <div className="divide-y divide-[#30363d]">
              <div className="p-4 flex items-center gap-3 hover:bg-[#161b22] cursor-pointer">
                <GitPullRequest className="w-5 h-5 text-[#3fb950]" /> <span className="text-white font-medium">Review React PR</span>
              </div>
              <div className="p-4 flex items-center gap-3 hover:bg-[#161b22] cursor-pointer">
                <MessageSquare className="w-5 h-5 text-[#a371f7]" /> <span className="text-white font-medium">Reply to Rust discussion</span>
              </div>
              <div className="p-4 flex items-center gap-3 hover:bg-[#161b22] cursor-pointer">
                <GitMerge className="w-5 h-5 text-[#8957e5]" /> <span className="text-white font-medium">Merge Pixi PR</span>
              </div>
              <div className="p-4 flex items-center gap-3 hover:bg-[#161b22] cursor-pointer">
                <Search className="w-5 h-5 text-[#d29922]" /> <span className="text-white font-medium">Answer maintainer question</span>
              </div>
              <div className="p-4 flex items-center gap-3 bg-[#238636]/10 text-[#3fb950] font-medium">
                <CheckCircle2 className="w-5 h-5" /> Done.
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-[#8b949e] text-lg font-medium">
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#3fb950]" /> No repository hopping.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#3fb950]" /> No notification hunting.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#3fb950]" /> No browser tab chaos.</span>
          </div>
        </div>
      </section>

      {/* 7. Inbox */}
      <section className="py-24 border-t border-[#30363d] bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">One inbox for all your GitHub work.</h2>
          <div className="flex flex-wrap justify-center gap-4 text-xl font-medium mb-12">
            <span className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-full text-white">Reviews.</span>
            <span className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-full text-white">Issues.</span>
            <span className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-full text-white">Mentions.</span>
            <span className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-full text-white">Discussions.</span>
            <span className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-full text-white">Pull Requests.</span>
          </div>
          <p className="text-2xl text-[#8b949e]">Everything together. One place.</p>
        </div>
      </section>

      {/* 8. AI */}
      <section className="py-24 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Understand conversations without reading everything.</h2>
            <p className="text-xl text-[#8b949e]">Instead of scrolling through hundreds of comments, GitTower summarizes:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl flex items-start gap-4">
              <Zap className="w-6 h-6 text-[#58a6ff] shrink-0 mt-1" />
              <div><h4 className="text-white font-medium mb-1">What changed</h4><p className="text-sm text-[#8b949e]">Catch up instantly.</p></div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#3fb950] shrink-0 mt-1" />
              <div><h4 className="text-white font-medium mb-1">What's already decided</h4><p className="text-sm text-[#8b949e]">Skip the back-and-forth.</p></div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-[#d29922] shrink-0 mt-1" />
              <div><h4 className="text-white font-medium mb-1">What's still unresolved</h4><p className="text-sm text-[#8b949e]">See the open blockers.</p></div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-[#f85149] shrink-0 mt-1" />
              <div><h4 className="text-white font-medium mb-1">What needs your response</h4><p className="text-sm text-[#8b949e]">Know exactly what to do.</p></div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-white mb-2">Spend time reviewing code.</p>
            <p className="text-2xl font-bold text-[#8b949e]">Not reading threads.</p>
          </div>
        </div>
      </section>

      {/* 9. Review Faster */}
      <section className="py-24 border-t border-[#30363d] bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Review without losing context.</h2>
          <p className="text-xl text-[#8b949e] mb-12">See discussions, files, timeline, AI summaries, and review status together.</p>
          <div className="inline-block px-8 py-4 bg-[#f85149]/10 border border-[#f85149]/20 text-[#f85149] rounded-full font-medium text-lg">
            No jumping between five GitHub pages.
          </div>
        </div>
      </section>

      {/* 10. Attention First */}
      <section className="py-24 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Repositories become metadata.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 text-center">
            
            <div>
              <h3 className="text-xl text-[#8b949e] mb-8 font-medium">GitHub organizes work like this.</h3>
              <div className="flex flex-col items-center font-mono text-sm">
                <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">Repository</div>
                <ArrowDown className="w-4 h-4 text-[#8b949e] my-2" />
                <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-[#8b949e]">Pull Request</div>
                <ArrowDown className="w-4 h-4 text-[#8b949e] my-2" />
                <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-[#8b949e]">Comments</div>
                <ArrowDown className="w-4 h-4 text-[#8b949e] my-2" />
                <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">Repository</div>
                <ArrowDown className="w-4 h-4 text-[#8b949e] my-2" />
                <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-[#8b949e]">Issue</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-white mb-8 font-bold">GitTower organizes it like this.</h3>
              <div className="flex flex-col items-center font-mono text-sm">
                <div className="px-6 py-3 bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded-lg text-[#58a6ff] font-bold">Needs Me</div>
                <ArrowDown className="w-4 h-4 text-[#58a6ff] my-2" />
                <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">Waiting</div>
                <ArrowDown className="w-4 h-4 text-[#8b949e] my-2" />
                <div className="px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white">Following</div>
                <ArrowDown className="w-4 h-4 text-[#8b949e] my-2" />
                <div className="px-6 py-3 bg-[#238636]/10 border border-[#238636]/30 rounded-lg text-[#3fb950] font-bold">Done</div>
              </div>
            </div>

          </div>

          <div className="text-center mt-20">
            <p className="text-2xl font-bold text-white mb-2">Your work comes first.</p>
            <p className="text-xl text-[#8b949e]">Repositories come second.</p>
          </div>
        </div>
      </section>

      {/* 11. Built For */}
      <section className="py-24 border-t border-[#30363d] bg-[#0d1117]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-[#161b22] border border-[#30363d] rounded-2xl">
              <Code className="w-8 h-8 text-[#58a6ff] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Open Source Contributors</h3>
              <p className="text-[#8b949e]">Contribute to multiple projects without losing track.</p>
            </div>
            <div className="p-8 bg-[#161b22] border border-[#30363d] rounded-2xl">
              <Star className="w-8 h-8 text-[#d29922] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Maintainers</h3>
              <p className="text-[#8b949e]">Know what needs your review and what can wait.</p>
            </div>
            <div className="p-8 bg-[#161b22] border border-[#30363d] rounded-2xl">
              <Users className="w-8 h-8 text-[#a371f7] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Engineering Teams</h3>
              <p className="text-[#8b949e]">Stay on top of discussions, reviews, and decisions.</p>
            </div>
            <div className="p-8 bg-[#161b22] border border-[#30363d] rounded-2xl">
              <Box className="w-8 h-8 text-[#3fb950] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Indie Developers</h3>
              <p className="text-[#8b949e]">Manage personal projects without tab overload.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Open Source */}
      <section className="py-24 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Built for developers.</h2>
          <div className="flex flex-wrap justify-center gap-6 text-lg font-medium text-[#c9d1d9]">
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#3fb950]" /> Free forever.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#3fb950]" /> Open source.</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-[#3fb950]" /> Community driven.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-lg font-medium text-[#8b949e]">
            <span>No subscriptions.</span>
            <span>No feature paywalls.</span>
            <span>No artificial limits.</span>
          </div>
        </div>
      </section>

      {/* 13. Final CTA */}
      <section className="py-32 border-t border-[#30363d] bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Stop searching GitHub.</h2>
          <h2 className="text-4xl md:text-5xl font-bold text-[#58a6ff] tracking-tight mb-8">Start organizing your work.</h2>
          
          <p className="text-xl text-[#8b949e] mb-12">Join thousands of developers who spend less time searching and more time shipping.</p>
          
          <button 
            onClick={onConnect}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 font-semibold rounded-full transition-all text-lg group mx-auto mb-6"
          >
            Continue with GitHub 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[#8b949e] font-medium">Free forever.</p>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="py-16 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#238636] rounded shadow-sm flex items-center justify-center text-white"><Github className="w-4 h-4" /></div>
              <span className="font-semibold text-white">GitTower</span>
            </div>
            <p className="text-sm text-[#8b949e]">The GitHub command center for developers.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-[#8b949e]">
              <li><a href="#" className="hover:text-[#58a6ff]">Features</a></li>
              <li><a href="#" className="hover:text-[#58a6ff]">Roadmap</a></li>
              <li><a href="#" className="hover:text-[#58a6ff]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#58a6ff]">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-3 text-sm text-[#8b949e]">
              <li><a href="#" className="hover:text-[#58a6ff]">GitHub</a></li>
              <li><a href="#" className="hover:text-[#58a6ff]">Discord</a></li>
              <li><a href="#" className="hover:text-[#58a6ff]">Discussions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-[#8b949e]">
              <li><a href="#" className="hover:text-[#58a6ff]">Blog</a></li>
              <li><a href="#" className="hover:text-[#58a6ff]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#58a6ff]">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

