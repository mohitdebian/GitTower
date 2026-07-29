import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

old_section = """                  <div className="flex items-center gap-3 text-sm text-app-muted">
                    <span className="font-medium text-app-text">{extractRepoName(item.repository_url)}</span>
                    <span className="text-app-muted">•</span>
                    <span>#{item.number}</span>
                    <span className="text-app-muted">•</span>
                    <span>by {item.user.login}</span>
                  </div>"""

new_section = """                  <div className="flex items-center gap-3 text-sm text-app-muted">
                    <span className="font-medium text-app-text">{extractRepoName(item.repository_url)}</span>
                    <span className="text-app-muted">•</span>
                    <span>#{item.number}</span>
                    <span className="text-app-muted">•</span>
                    <span>by {item.user.login}</span>
                  </div>
                  {item.related_issue && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <div className="bg-app-border text-app-muted px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Fixes #{item.related_issue.number}</span>
                      </div>
                      <a href={item.related_issue.html_url} target="_blank" rel="noopener noreferrer" className="text-app-meta hover:text-app-muted transition-colors truncate">
                        {item.related_issue.title}
                      </a>
                    </div>
                  )}"""
content = content.replace(old_section, new_section)

with open('app/page.tsx', 'w') as f:
    f.write(content)
