import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("useState<'inbox' | 'reviews' | 'mentions' | 'my-prs' | 'involved'>('inbox')", "useState<'inbox' | 'reviews' | 'mentions' | 'my-prs' | 'involved' | 'manage-repos'>('inbox')")

sidebar_items = """          <button onClick={() => { setActiveView('involved'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'involved' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Involved</span>
          </button>
        </div>"""

new_sidebar_items = """          <button onClick={() => { setActiveView('involved'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'involved' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Involved</span>
          </button>
          
          <div className="text-xs font-medium text-app-muted uppercase tracking-wider mb-2 px-3 mt-4">Settings</div>
          <button onClick={() => { setActiveView('manage-repos'); setSelectedItem(null); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'manage-repos' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Manage Repositories</span>
          </button>
        </div>"""

content = content.replace(sidebar_items, new_sidebar_items)
content = content.replace("import { Github, Loader2, GitPullRequest, AtSign, MessageCircle, GitMerge, CheckCircle2, AlertCircle, ExternalLink, LogOut, Inbox } from 'lucide-react';", "import { Github, Loader2, GitPullRequest, AtSign, MessageCircle, GitMerge, CheckCircle2, AlertCircle, ExternalLink, LogOut, Inbox, Settings } from 'lucide-react';")

with open('app/page.tsx', 'w') as f:
    f.write(content)
