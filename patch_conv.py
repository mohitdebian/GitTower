import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Imports
content = content.replace(
    "import Image from 'next/image';",
    "import Image from 'next/image';\nimport Markdown from 'react-markdown';\nimport remarkGfm from 'remark-gfm';\nimport { ArrowLeft } from 'lucide-react';"
)

# 2. Type updates
old_type = """  related_issue?: {
    number: number;
    title: string;
    html_url: string;
  };
};"""
new_type = """  related_issue?: {
    number: number;
    title: string;
    html_url: string;
  };
  body?: string;
  comments_list?: {
    id: number;
    user: { login: string; avatar_url: string };
    created_at: string;
    body: string;
  }[];
};"""
content = content.replace(old_type, new_type)

# 3. Add selectedItem state
old_state = "const [activeView, setActiveView] = useState<'inbox' | 'reviews' | 'mentions' | 'my-prs' | 'involved'>('inbox');"
new_state = """const [activeView, setActiveView] = useState<'inbox' | 'reviews' | 'mentions' | 'my-prs' | 'involved'>('inbox');
  const [selectedItem, setSelectedItem] = useState<GitHubIssue | null>(null);"""
content = content.replace(old_state, new_state)

# 4. Modify mock data to add body and comments
old_mock = """        reviewRequested: [
          {
            id: 1,
            html_url: "#",
            title: "Implement useOptimistic hook primitives",
            number: 842,
            state: "open",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user: { login: "sophiebits", avatar_url: "https://avatars.githubusercontent.com/u/6820?v=4" },
            repository_url: "https://api.github.com/repos/facebook/react"
          }
        ],"""
new_mock = """        reviewRequested: [
          {
            id: 1,
            html_url: "#",
            title: "Implement useOptimistic hook primitives",
            number: 842,
            state: "open",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user: { login: "sophiebits", avatar_url: "https://avatars.githubusercontent.com/u/6820?v=4" },
            repository_url: "https://api.github.com/repos/facebook/react",
            body: "This PR introduces the `useOptimistic` hook primitive as discussed in #840.\\n\\n### Changes:\\n- Added `useOptimistic` implementation in `react-reconciler`.\\n- Added tests for concurrent rendering.\\n\\nPlease review the scheduler integration part carefully.",
            comments_list: [
              {
                id: 101,
                user: { login: "acdlite", avatar_url: "https://avatars.githubusercontent.com/u/3624098?v=4" },
                created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                body: "LGTM! But could you add a test case for when the optimistic update gets rejected by the server?"
              }
            ]
          }
        ],"""
content = content.replace(old_mock, new_mock)

# Mentions
old_mock2 = """        mentions: [
          {
            id: 2,
            html_url: "#",
            title: "What's the best way to handle...",
            number: 1205,
            state: "open",
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            user: { login: "jaredpalmer", avatar_url: "https://avatars.githubusercontent.com/u/4060187?v=4" },
            repository_url: "https://api.github.com/repos/vercel/turbo"
          }
        ],"""
new_mock2 = """        mentions: [
          {
            id: 2,
            html_url: "#",
            title: "What's the best way to handle...",
            number: 1205,
            state: "open",
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            user: { login: "jaredpalmer", avatar_url: "https://avatars.githubusercontent.com/u/4060187?v=4" },
            repository_url: "https://api.github.com/repos/vercel/turbo",
            body: "I'm trying to figure out the best way to handle persistent caching across builds when `TURBO_CACHE_DIR` is set.\\n\\nHey @developer, didn't you run into this issue last month? What was your workaround?",
            comments_list: []
          }
        ],"""
content = content.replace(old_mock2, new_mock2)

# Involved
old_mock3 = """        involved: [
          {
            id: 4,
            html_url: "#",
            title: "Review feedback from yesterday",
            number: 56,
            state: "open",
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            user: { login: "qwen", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4" },
            repository_url: "https://api.github.com/repos/qwen/paw"
          }
        ]"""
new_mock3 = """        involved: [
          {
            id: 4,
            html_url: "#",
            title: "Review feedback from yesterday",
            number: 56,
            state: "open",
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            user: { login: "qwen", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4" },
            repository_url: "https://api.github.com/repos/qwen/paw",
            body: "I've updated the logic based on yesterday's review.",
            comments_list: [
              {
                id: 201,
                user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
                created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
                body: "Looks much better, thanks!"
              },
              {
                id: 202,
                user: { login: "qwen", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4" },
                created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                body: "Merging this now."
              }
            ]
          }
        ]"""
content = content.replace(old_mock3, new_mock3)

# Reset selectedItem on view change
old_view_buttons = [
    "onClick={() => setActiveView('inbox')}",
    "onClick={() => setActiveView('reviews')}",
    "onClick={() => setActiveView('mentions')}",
    "onClick={() => setActiveView('my-prs')}",
    "onClick={() => setActiveView('involved')}"
]
new_view_buttons = [
    "onClick={() => { setActiveView('inbox'); setSelectedItem(null); }}",
    "onClick={() => { setActiveView('reviews'); setSelectedItem(null); }}",
    "onClick={() => { setActiveView('mentions'); setSelectedItem(null); }}",
    "onClick={() => { setActiveView('my-prs'); setSelectedItem(null); }}",
    "onClick={() => { setActiveView('involved'); setSelectedItem(null); }}"
]
for i in range(len(old_view_buttons)):
    content = content.replace(old_view_buttons[i], new_view_buttons[i])


# Update Main Content rendering when selectedItem is present
old_main_content_start = """      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12">
          
          <header className="flex items-center justify-between mb-8">"""

new_main_content_start = """      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12">
          
          {selectedItem ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <button 
                onClick={() => setSelectedItem(null)} 
                className="flex items-center gap-2 text-sm text-app-muted hover:text-app-text transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to list
              </button>
              
              <div className="border-b border-app-border pb-6">
                <div className="flex items-center gap-3 text-sm text-app-muted mb-3">
                  <span className="font-medium text-app-text">{extractRepoName(selectedItem.repository_url)}</span>
                  <span>•</span>
                  <span>#{selectedItem.number}</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 capitalize">
                    {selectedItem.state}
                  </span>
                </div>
                <h1 className="text-2xl font-semibold text-app-text mb-4">{selectedItem.title}</h1>
                <div className="flex items-center gap-3 text-sm text-app-muted">
                  <Image src={selectedItem.user.avatar_url} alt={selectedItem.user.login} width={24} height={24} className="rounded-full" />
                  <span className="font-medium text-app-text">{selectedItem.user.login}</span>
                  <span>opened this on {new Date(selectedItem.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Timeline / Conversation */}
                <div className="flex-1 space-y-6 min-w-0">
                  {/* OP Body */}
                  <div className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-app-sidebar border-b border-app-border px-4 py-3 flex items-center gap-3">
                      <Image src={selectedItem.user.avatar_url} alt={selectedItem.user.login} width={28} height={28} className="rounded-full" />
                      <span className="font-medium text-app-text text-sm">{selectedItem.user.login}</span>
                      <span className="text-app-meta text-xs">commented {formatDistanceToNow(new Date(selectedItem.created_at), { addSuffix: true })}</span>
                    </div>
                    <div className="p-5 prose prose-invert prose-sm max-w-none prose-pre:bg-app-base prose-pre:border prose-pre:border-app-border">
                      <Markdown remarkPlugins={[remarkGfm]}>{selectedItem.body || "*No description provided.*"}</Markdown>
                    </div>
                  </div>
                  
                  {/* Comments */}
                  {selectedItem.comments_list?.map(comment => (
                    <div key={comment.id} className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">
                      <div className="bg-app-sidebar border-b border-app-border px-4 py-3 flex items-center gap-3">
                        <Image src={comment.user.avatar_url} alt={comment.user.login} width={28} height={28} className="rounded-full" />
                        <span className="font-medium text-app-text text-sm">{comment.user.login}</span>
                        <span className="text-app-meta text-xs">commented {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                      </div>
                      <div className="p-5 prose prose-invert prose-sm max-w-none prose-pre:bg-app-base prose-pre:border prose-pre:border-app-border">
                        <Markdown remarkPlugins={[remarkGfm]}>{comment.body}</Markdown>
                      </div>
                    </div>
                  ))}
                  
                  {/* Reply Box */}
                  <div className="bg-app-panel border border-app-border rounded-xl shadow-sm p-4">
                    <textarea 
                      placeholder="Leave a comment..."
                      className="w-full bg-app-base border border-app-border rounded-lg p-3 text-app-text text-sm placeholder:text-app-meta focus:outline-none focus:border-blue-500 min-h-[100px] resize-y"
                    ></textarea>
                    <div className="flex justify-end mt-3">
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar Context */}
                <div className="w-full lg:w-64 shrink-0 space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Reviewers</h3>
                    <div className="text-sm text-app-meta">No reviewers requested</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Assignees</h3>
                    <div className="text-sm text-app-meta">No one assigned</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Labels</h3>
                    <div className="text-sm text-app-meta">None yet</div>
                  </div>
                  {selectedItem.related_issue && (
                    <div>
                      <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Related Issue</h3>
                      <div className="text-sm text-app-text">#{selectedItem.related_issue.number} {selectedItem.related_issue.title}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <header className="flex items-center justify-between mb-8">"""

content = content.replace(old_main_content_start, new_main_content_start)


# Update section closing
old_section_closing = """            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}"""

new_section_closing = """            </div>
          ) : null}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}"""
content = content.replace(old_section_closing, new_section_closing)


# Update Section to receive onItemSelected
old_section_def = """function Section({ id, title, icon, items, emptyMessage, extractRepoName }: { id: string, title: string, icon: React.ReactNode, items: GitHubIssue[], emptyMessage: string, extractRepoName: (url: string) => string }) {"""
new_section_def = """function Section({ id, title, icon, items, emptyMessage, extractRepoName, onItemSelected }: { id: string, title: string, icon: React.ReactNode, items: GitHubIssue[], emptyMessage: string, extractRepoName: (url: string) => string, onItemSelected: (item: GitHubIssue) => void }) {"""
content = content.replace(old_section_def, new_section_def)


# Update <a> to <button> for item clicks in Section
old_item_render = """          {items.map((item, index) => (
            <a 
              key={item.id} 
              href={item.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block p-4 sm:px-6 hover:bg-app-base transition-colors group ${index !== items.length - 1 ? 'border-b border-app-border' : ''}`}
            >"""
new_item_render = """          {items.map((item, index) => (
            <button 
              key={item.id} 
              onClick={() => onItemSelected(item)}
              className={`block w-full text-left p-4 sm:px-6 hover:bg-app-base transition-colors group ${index !== items.length - 1 ? 'border-b border-app-border' : ''}`}
            >"""
# Some lines were already replaced, let's use regex to be safe
content = re.sub(r'<a\s*key=\{item\.id\}\s*href=\{item\.html_url\}\s*target="_blank"\s*rel="noopener noreferrer"\s*className=\{`block (p-4[^`]+)`\}', r'<button key={item.id} onClick={() => onItemSelected(item)} className={`block w-full text-left \1`}', content)
content = content.replace("</a>", "</button>")


# Add onItemSelected={setSelectedItem} to all Section components
content = content.replace('extractRepoName={extractRepoName}\n              />', 'extractRepoName={extractRepoName}\n                onItemSelected={setSelectedItem}\n              />')

with open('app/page.tsx', 'w') as f:
    f.write(content)

