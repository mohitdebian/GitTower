import React from 'react';
import { motion } from 'motion/react';
import { Github, FolderTree, Zap, Layers, MessageSquare, Shield, CheckCircle2 } from 'lucide-react';

export default function LandingPage({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-md z-50 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Github className="w-5 h-5" />
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 tracking-wide text-lg">GitTower</span>
        </div>
        <button 
          onClick={onConnect}
          className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 lg:px-12 max-w-6xl mx-auto relative">
        {/* Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              GitTower 2.0 is now live
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Stop drowning in <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">GitHub notifications.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              GitTower organizes your PRs, issues, and discussions into a single, real-time command center so you never miss a beat. Zero context switching required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={onConnect}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Github className="w-5 h-5" />
              <span>Connect GitHub to Start</span>
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-lg group-hover:bg-white/40 transition-colors -z-10" />
            </button>
          </motion.div>
        </div>

        {/* Abstract UI Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] blur-2xl opacity-20" />
          <div className="relative bg-[#161b22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
            {/* Abstract UI representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] to-[#161b22]" />
            <div className="w-full h-full relative p-8 flex gap-6">
              <div className="w-64 border-r border-white/5 space-y-4">
                 <div className="w-3/4 h-4 bg-white/5 rounded" />
                 <div className="w-full h-4 bg-blue-500/20 rounded" />
                 <div className="w-5/6 h-4 bg-white/5 rounded" />
              </div>
              <div className="flex-1 space-y-6">
                 <div className="w-1/2 h-8 bg-white/10 rounded-lg" />
                 <div className="space-y-3">
                   <div className="w-full h-16 bg-white/5 rounded-xl border border-white/5" />
                   <div className="w-full h-16 bg-white/5 rounded-xl border border-white/5" />
                   <div className="w-3/4 h-16 bg-white/5 rounded-xl border border-white/5" />
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* The Problem Section */}
      <section className="py-24 bg-[#090c10] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The GitHub inbox is broken.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">You're wasting hours every week just trying to figure out what needs your attention.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Context Switching", desc: "You have 42 tabs open just to review one PR. Navigating back and forth breaks your flow.", icon: Layers },
              { title: "Noisy Inbox", desc: "Important mentions get buried under automated bot noise, dependabot alerts, and CI/CD failures.", icon: MessageSquare },
              { title: "Lost Track", desc: "You forget which PRs you're supposed to review and which ones you're waiting on.", icon: Zap }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#161b22] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-white mb-4">Enter GitTower.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A command center designed specifically for developers who want to stay in the zone.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              {[
                { title: "The Work Tree", desc: "A revolutionary hierarchical view of all your repositories. See issues, PRs, and discussions mapped out logically.", icon: FolderTree },
                { title: "Zero Context Switching", desc: "Read full PR descriptions, issue timelines, and reply to comments right from the dashboard.", icon: CheckCircle2 },
                { title: "Real-Time Sync", desc: "Never hit refresh again. GitTower connects to the GitHub API and updates your data automatically in the background.", icon: Zap }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
              <div className="relative bg-[#161b22] p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#0d1117] border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="w-1/3 h-3 bg-white/20 rounded" />
                        <div className="w-full h-3 bg-white/10 rounded" />
                        <div className="w-5/6 h-3 bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] to-[#161b22]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Shield className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to regain your focus?</h2>
          <p className="text-gray-400 mb-10 text-lg">Connect your GitHub account instantly. We only request read access to your public and private repositories, and permission to reply to comments on your behalf.</p>
          <button 
            onClick={onConnect}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <Github className="w-5 h-5" />
            Connect GitHub
          </button>
        </div>
      </footer>
    </div>
  );
}
