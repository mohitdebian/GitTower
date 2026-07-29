import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

bad_closing = """                      <a href={item.related_issue.html_url} target="_blank" rel="noopener noreferrer" className="text-app-meta hover:text-app-muted transition-colors truncate">
                        {item.related_issue.title}
                      </button>"""

good_closing = """                      <a href={item.related_issue.html_url} target="_blank" rel="noopener noreferrer" className="text-app-meta hover:text-app-muted transition-colors truncate">
                        {item.related_issue.title}
                      </a>"""

content = content.replace(bad_closing, good_closing)

with open('app/page.tsx', 'w') as f:
    f.write(content)
