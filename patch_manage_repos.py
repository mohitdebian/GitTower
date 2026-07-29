import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

bad_manage_repos = """                    ) : activeView === 'manage-repos' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <header className="mb-8">
                <h1 className="text-2xl font-semibold text-app-text tracking-tight">Manage Repositories</h1>
                <p className="text-app-muted mt-1">Select repositories you want to mute. You won't receive inbox notifications for muted repositories.</p>
              </header>
              <div className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">"""

good_manage_repos = """          ) : activeView === 'manage-repos' ? (
            <div className="space-y-12">
              <div className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">"""

content = content.replace(bad_manage_repos, good_manage_repos)

# Also fix the closing tag which is now `</motion.div>` but should just be `</div>`
# Wait, let's look at the closing of manage_repos
content = content.replace("</div>\n            </motion.div>\n          ) : data ? (", "</div>\n            </div>\n          ) : data ? (")

with open('app/page.tsx', 'w') as f:
    f.write(content)
