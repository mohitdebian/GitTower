import React from 'react';
import { motion } from 'motion/react';
import { Github, FolderTree, Layers, MessageSquare, Inbox, GitPullRequest, Search, LayoutTemplate, Activity } from 'lucide-react';

export default function LandingPage({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-x-hidden selection:bg-[#1f6feb] selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-md z-50 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-b from-[#238636] to-[#2ea043] rounded-md flex items-center justify-center text-white border border-[#3fb950]/50 shadow-sm">
            <Github className="w-5 h-5" />
          </div>
          <span className="font-semibold text-[#c9d1d9] text-lg tracking-tight">GitTower</span>
        </div>
        <button 
          onClick={onConnect}
          className="text-sm font-medium px-4 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] transition-colors text-[#c9d1d9]"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Your entire GitHub workflow, <br className="hidden md:block" />
              unified in one command center.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
              Stop context switching. Manage pull requests, triage issues, and reply to discussions directly from a single, high-performance dashboard.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="pt-6 pb-8"
          >
            <button 
              onClick={onConnect}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-md border border-[#3fb950]/30 transition-colors shadow-sm"
            >
              <Github className="w-5 h-5" />
              Connect GitHub Account
            </button>
          </motion.div>
        </div>

        {/* Clean UI Mockup Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">
            {/* Mockup Sidebar */}
            <div className="w-full md:w-64 border-r border-[#30363d] bg-[#0d1117] p-4 hidden md:flex flex-col gap-6 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 bg-[#238636] rounded shadow-sm" />
                 <div className="h-4 w-20 bg-[#30363d] rounded" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-md bg-[#1f6feb]/10 border border-[#1f6feb]/20">
                  <Inbox className="w-4 h-4 text-[#58a6ff]" />
                  <div className="h-3 w-16 bg-[#58a6ff] rounded opacity-80" />
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <div className="w-4 h-4 rounded-full bg-[#30363d]" />
                    <div className="h-3 w-24 bg-[#30363d] rounded" />
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-12 bg-[#30363d] rounded mb-4" />
                <div className="flex items-center gap-3 p-2">
                  <FolderTree className="w-4 h-4 text-[#8b949e]" />
                  <div className="h-3 w-20 bg-[#30363d] rounded" />
                </div>
              </div>
            </div>
            
            {/* Mockup Main Content */}
            <div className="flex-1 bg-[#0d1117] flex flex-col">
              {/* Mockup Header */}
              <div className="h-14 border-b border-[#30363d] px-6 flex items-center">
                <div className="h-4 w-32 bg-[#c9d1d9] rounded" />
              </div>
              
              {/* Mockup List */}
              <div className="flex-1 p-6 space-y-4">
                {[
                  { icon: GitPullRequest, color: "text-[#3fb950]", width: "w-3/4" },
                  { icon: MessageSquare, color: "text-[#a371f7]", width: "w-2/3" },
                  { icon: GitPullRequest, color: "text-[#3fb950]", width: "w-4/5" },
                  { icon: MessageSquare, color: "text-[#a371f7]", width: "w-1/2" },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg border border-[#30363d] bg-[#161b22] flex items-start gap-4">
                    <item.icon className={`w-5 h-5 mt-0.5 ${item.color}`} />
                    <div className="flex-1 space-y-2">
                      <div className={`h-4 bg-[#c9d1d9] rounded ${item.width}`} />
                      <div className="flex gap-2">
                        <div className="h-3 w-16 bg-[#8b949e] rounded" />
                        <div className="h-3 w-12 bg-[#8b949e] rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Feature Grid Section */}
      <section className="py-24 border-y border-[#30363d] bg-[#010409]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Everything you need, in one place.</h2>
            <p className="text-[#8b949e] max-w-2xl mx-auto">GitTower replaces scattered tabs and email notifications with a highly structured, incredibly fast native-feeling dashboard.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: "Zero Context Switching", 
                desc: "Read descriptions, review timelines, and post comments directly inline. Never open another GitHub tab again.",
                icon: LayoutTemplate,
                color: "text-[#58a6ff]"
              },
              { 
                title: "The Work Tree", 
                desc: "Visualize all your repositories, pull requests, and issues in a clean, hierarchical folder structure.",
                icon: FolderTree,
                color: "text-[#3fb950]"
              },
              { 
                title: "Real-Time Synchronization", 
                desc: "Your data is always fresh. New mentions, comments, and CI/CD status checks update automatically.",
                icon: Activity,
                color: "text-[#a371f7]"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] hover:border-[#8b949e] transition-colors"
              >
                <feature.icon className={`w-8 h-8 mb-5 ${feature.color}`} />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#8b949e] leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail View Mockup Section */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white leading-tight">Focus deeply on the work that matters.</h2>
              <p className="text-[#8b949e] text-lg leading-relaxed">
                By organizing your GitHub workload into actionable streams, GitTower eliminates the noise of dependabot alerts and automated CI failures. 
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Categorized inboxes for Mentions, Assigned, and Reviews.",
                  "Full markdown rendering for rich text reading.",
                  "Instantly reply to threads without leaving the app."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded-full bg-[#2ea043]/20 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                    </div>
                    <span className="text-[#c9d1d9]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Detail View UI Mockup */}
            <div className="relative">
              <div className="bg-[#161b22] border border-[#30363d] rounded-xl shadow-xl overflow-hidden aspect-[4/3] flex flex-col">
                <div className="h-12 border-b border-[#30363d] bg-[#0d1117] flex items-center px-4 gap-4">
                  <div className="w-4 h-4 rounded-full bg-[#3fb950]" />
                  <div className="h-3 w-48 bg-[#c9d1d9] rounded" />
                </div>
                <div className="p-6 flex-1 bg-[#0d1117] space-y-6 overflow-hidden">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#30363d] shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-3 w-32 bg-[#8b949e] rounded" />
                      <div className="h-20 w-full border border-[#30363d] bg-[#161b22] rounded-md p-3 space-y-2">
                        <div className="h-2 w-full bg-[#30363d] rounded" />
                        <div className="h-2 w-5/6 bg-[#30363d] rounded" />
                        <div className="h-2 w-1/2 bg-[#30363d] rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pl-12">
                    <div className="w-6 h-6 rounded-full bg-[#30363d] shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-3 w-24 bg-[#8b949e] rounded" />
                      <div className="h-12 w-3/4 border border-[#30363d] bg-[#161b22] rounded-md p-3 space-y-2">
                        <div className="h-2 w-full bg-[#30363d] rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 border-t border-[#30363d] bg-[#010409]">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Start organizing your GitHub workload.</h2>
          <p className="text-[#8b949e] text-lg">GitTower connects seamlessly with your existing GitHub account via secure OAuth. No configuration required.</p>
          <button 
            onClick={onConnect}
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-md border border-[#3fb950]/30 transition-colors shadow-sm"
          >
            <Github className="w-5 h-5" />
            Connect GitHub
          </button>
        </div>
      </footer>
    </div>
  );
}
