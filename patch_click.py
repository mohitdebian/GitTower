import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

bad_link = 'href={item.related_issue.html_url} target="_blank" rel="noopener noreferrer" className="text-app-meta hover:text-app-muted transition-colors truncate"'
good_link = 'href={item.related_issue.html_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-app-meta hover:text-app-muted transition-colors truncate"'

content = content.replace(bad_link, good_link)

with open('app/page.tsx', 'w') as f:
    f.write(content)
