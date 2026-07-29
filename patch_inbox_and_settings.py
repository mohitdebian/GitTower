import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Change Inbox sections
# Remove activeView === 'inbox' from reviews
content = content.replace("{(activeView === 'inbox' || activeView === 'reviews') && (", "{(activeView === 'reviews') && (")

# Now add the manage-repos view
settings_view = """          ) : activeView === 'manage-repos' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <header className="mb-8">
                <h1 className="text-2xl font-semibold text-app-text tracking-tight">Manage Repositories</h1>
                <p className="text-app-muted mt-1">Select repositories you want to mute. You won't receive inbox notifications for muted repositories.</p>
              </header>
              <div className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-app-border flex items-center justify-between">
                  <h3 className="font-semibold text-app-text">Your Repositories</h3>
                </div>
                <div className="divide-y divide-app-border">
                  {[
                    { name: 'facebook/react', muted: false },
                    { name: 'vercel/next.js', muted: true },
                    { name: 'rust-lang/rust', muted: false },
                    { name: 'qwen/paw', muted: false }
                  ].map((repo, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-app-base transition-colors">
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-app-muted" />
                        <span className="font-medium text-app-text">{repo.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={repo.muted} />
                        <div className="w-11 h-6 bg-app-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-app-muted">Muted</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : data ? ("""

content = content.replace(") : data ? (", settings_view)

# Add title logic for manage-repos
title_logic_old = "{activeView === 'involved' && 'Involved Discussions'}"
title_logic_new = "{activeView === 'involved' && 'Involved Discussions'}\n                {activeView === 'manage-repos' && 'Manage Repositories'}"
content = content.replace(title_logic_old, title_logic_new)

desc_logic_old = "{activeView === 'involved' && 'Discussions you have participated in.'}"
desc_logic_new = "{activeView === 'involved' && 'Discussions you have participated in.'}\n                {activeView === 'manage-repos' && 'Control which repositories show up in your inbox.'}"
content = content.replace(desc_logic_old, desc_logic_new)

with open('app/page.tsx', 'w') as f:
    f.write(content)
