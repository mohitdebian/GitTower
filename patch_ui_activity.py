import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Update left pane
left_pane_search = """                  <div className="flex items-center gap-3 text-sm text-app-muted">
                    <span className="font-medium text-app-text">{extractRepoName(item.repository_url)}</span>
                    <span className="text-app-muted">•</span>
                    <span>#{item.number}</span>
                    <span className="text-app-muted">•</span>
                    <span>by {item.user.login}</span>
                  </div>"""

left_pane_replace = """                  <div className="flex items-center gap-3 text-sm text-app-muted">
                    <span className="font-medium text-app-text">{extractRepoName(item.repository_url)}</span>
                    <span className="text-app-muted">•</span>
                    <span>#{item.number}</span>
                    <span className="text-app-muted">•</span>
                    <span>by {item.user.login}</span>
                  </div>
                  {item.recent_activity && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <Image src={item.recent_activity.user.avatar_url} alt={item.recent_activity.user.login} width={16} height={16} className="w-4 h-4 rounded-full" referrerPolicy="no-referrer" />
                      <span className="text-app-text font-medium">{item.recent_activity.user.login}</span>
                      <span className="text-app-muted">{item.recent_activity.action}</span>
                      <span className="text-app-meta">• {formatDistanceToNow(new Date(item.recent_activity.created_at), { addSuffix: true })}</span>
                    </div>
                  )}"""
content = content.replace(left_pane_search, left_pane_replace)

# 2. Update right pane (details)
right_pane_search = """                <div className="mb-6 flex items-center gap-4 text-sm text-app-muted">
                  <span className="flex items-center gap-1.5"><Github className="w-4 h-4" /> {extractRepoName(selectedItem.repository_url)}</span>
                  <span>•</span>
                  <span>#{selectedItem.number}</span>
                  <span>•</span>
                  <span>Opened {formatDistanceToNow(new Date(selectedItem.created_at), { addSuffix: true })} by {selectedItem.user.login}</span>
                </div>"""

right_pane_replace = """                <div className="mb-6 flex items-center gap-4 text-sm text-app-muted">
                  <span className="flex items-center gap-1.5"><Github className="w-4 h-4" /> {extractRepoName(selectedItem.repository_url)}</span>
                  <span>•</span>
                  <span>#{selectedItem.number}</span>
                  <span>•</span>
                  <span>Opened {formatDistanceToNow(new Date(selectedItem.created_at), { addSuffix: true })} by {selectedItem.user.login}</span>
                </div>
                
                {selectedItem.recent_activity && (
                  <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                    <Image src={selectedItem.recent_activity.user.avatar_url} alt={selectedItem.recent_activity.user.login} width={32} height={32} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    <div>
                      <div className="text-sm">
                        <span className="font-semibold text-app-text">{selectedItem.recent_activity.user.login}</span>
                        <span className="text-app-muted ml-1">{selectedItem.recent_activity.action}</span>
                      </div>
                      <div className="text-xs text-app-meta mt-1">
                        {formatDistanceToNow(new Date(selectedItem.recent_activity.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                )}"""
content = content.replace(right_pane_search, right_pane_replace)

with open('app/page.tsx', 'w') as f:
    f.write(content)
