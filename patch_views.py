import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Add Inbox to imports
content = content.replace('import { Github, Loader2, GitPullRequest, AtSign, MessageCircle, GitMerge, CheckCircle2, AlertCircle, ExternalLink, LogOut } from \'lucide-react\';', 
                          'import { Github, Loader2, GitPullRequest, AtSign, MessageCircle, GitMerge, CheckCircle2, AlertCircle, ExternalLink, LogOut, Inbox } from \'lucide-react\';')

# Add state
old_state = "const [loading, setLoading] = useState(false);"
new_state = """const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<'inbox' | 'reviews' | 'mentions' | 'my-prs' | 'involved'>('inbox');"""
content = content.replace(old_state, new_state)

# Replace Sidebar links
old_sidebar_links = """<div className="text-xs font-medium text-app-muted uppercase tracking-wider mb-2 px-3 mt-4">Views</div>
          <a href="#reviews" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-app-panel text-app-muted hover:text-app-text transition-colors">
            <GitPullRequest className="w-4 h-4" />
            <span className="text-sm font-medium">Review Requests</span>
          </a>
          <a href="#mentions" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-app-panel text-app-muted hover:text-app-text transition-colors">
            <AtSign className="w-4 h-4" />
            <span className="text-sm font-medium">Mentions</span>
          </a>
          <a href="#my-prs" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-app-panel text-app-muted hover:text-app-text transition-colors">
            <GitMerge className="w-4 h-4" />
            <span className="text-sm font-medium">My Pull Requests</span>
          </a>
          <a href="#involved" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-app-panel text-app-muted hover:text-app-text transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Involved</span>
          </a>"""

new_sidebar_links = """<div className="text-xs font-medium text-app-muted uppercase tracking-wider mb-2 px-3 mt-4">Views</div>
          <button onClick={() => setActiveView('inbox')} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'inbox' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <Inbox className="w-4 h-4" />
            <span className="text-sm font-medium">Inbox</span>
          </button>
          <button onClick={() => setActiveView('reviews')} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'reviews' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <GitPullRequest className="w-4 h-4" />
            <span className="text-sm font-medium">Review Requests</span>
          </button>
          <button onClick={() => setActiveView('mentions')} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'mentions' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <AtSign className="w-4 h-4" />
            <span className="text-sm font-medium">Mentions</span>
          </button>
          <button onClick={() => setActiveView('my-prs')} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'my-prs' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <GitMerge className="w-4 h-4" />
            <span className="text-sm font-medium">My Pull Requests</span>
          </button>
          <button onClick={() => setActiveView('involved')} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'involved' ? 'bg-app-panel text-app-text' : 'text-app-muted hover:bg-app-panel hover:text-app-text'}`}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Involved</span>
          </button>"""

content = content.replace(old_sidebar_links, new_sidebar_links)

# Update Main Content Header
old_header = """<h1 className="text-2xl font-semibold text-app-text tracking-tight">Your Inbox</h1>
              <p className="text-app-muted mt-1">Focus on what needs your attention right now.</p>"""

new_header = """<h1 className="text-2xl font-semibold text-app-text tracking-tight">
                {activeView === 'inbox' && 'Your Inbox'}
                {activeView === 'reviews' && 'Review Requests'}
                {activeView === 'mentions' && 'Mentions'}
                {activeView === 'my-prs' && 'My Pull Requests'}
                {activeView === 'involved' && 'Involved Discussions'}
              </h1>
              <p className="text-app-muted mt-1">
                {activeView === 'inbox' && 'Focus on what needs your attention right now.'}
                {activeView === 'reviews' && 'Pull requests where your review is requested.'}
                {activeView === 'mentions' && 'Conversations where you were mentioned.'}
                {activeView === 'my-prs' && 'Track the status of pull requests you opened.'}
                {activeView === 'involved' && 'Discussions you have participated in.'}
              </p>"""
content = content.replace(old_header, new_header)

# Update content sections based on activeView
old_sections = """            <div className="space-y-12">
              <Section 
                id="reviews"
                title="Review Requests" 
                icon={<GitPullRequest className="w-5 h-5 text-blue-500" />} 
                items={data.reviewRequested} 
                emptyMessage="You have no pending review requests. Great job!"
                extractRepoName={extractRepoName}
              />
              <Section 
                id="mentions"
                title="Mentions" 
                icon={<AtSign className="w-5 h-5 text-orange-500" />} 
                items={data.mentions} 
                emptyMessage="No unaddressed mentions."
                extractRepoName={extractRepoName}
              />
              <Section 
                id="my-prs"
                title="Your Pull Requests" 
                icon={<GitMerge className="w-5 h-5 text-purple-500" />} 
                items={data.myPrs} 
                emptyMessage="You don't have any open pull requests."
                extractRepoName={extractRepoName}
              />
              <Section 
                id="involved"
                title="Involved Discussions" 
                icon={<MessageCircle className="w-5 h-5 text-emerald-500" />} 
                items={data.involved} 
                emptyMessage="You're all caught up on discussions."
                extractRepoName={extractRepoName}
              />
            </div>"""

new_sections = """            <div className="space-y-12">
              {(activeView === 'inbox' || activeView === 'reviews') && (
                <Section 
                  id="reviews"
                  title="Review Requests" 
                  icon={<GitPullRequest className="w-5 h-5 text-blue-500" />} 
                  items={data.reviewRequested} 
                  emptyMessage="You have no pending review requests. Great job!"
                  extractRepoName={extractRepoName}
                />
              )}
              {(activeView === 'inbox' || activeView === 'mentions') && (
                <Section 
                  id="mentions"
                  title="Mentions" 
                  icon={<AtSign className="w-5 h-5 text-orange-500" />} 
                  items={data.mentions} 
                  emptyMessage="No unaddressed mentions."
                  extractRepoName={extractRepoName}
                />
              )}
              {(activeView === 'inbox' || activeView === 'my-prs') && (
                <Section 
                  id="my-prs"
                  title="Your Pull Requests" 
                  icon={<GitMerge className="w-5 h-5 text-purple-500" />} 
                  items={data.myPrs} 
                  emptyMessage="You don't have any open pull requests."
                  extractRepoName={extractRepoName}
                />
              )}
              {(activeView === 'inbox' || activeView === 'involved') && (
                <Section 
                  id="involved"
                  title="Involved Discussions" 
                  icon={<MessageCircle className="w-5 h-5 text-emerald-500" />} 
                  items={data.involved} 
                  emptyMessage="You're all caught up on discussions."
                  extractRepoName={extractRepoName}
                />
              )}
            </div>"""
content = content.replace(old_sections, new_sections)

with open('app/page.tsx', 'w') as f:
    f.write(content)
