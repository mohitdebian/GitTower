import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Loading / Unauthenticated states
content = content.replace('bg-slate-50', 'bg-app-base')
content = content.replace('text-slate-400', 'text-app-meta')
content = content.replace('bg-white', 'bg-app-panel')
content = content.replace('border-slate-200', 'border-app-border')
content = content.replace('text-slate-900', 'text-app-text')
content = content.replace('text-slate-500', 'text-app-muted')

# Sidebar
content = content.replace('bg-slate-900', 'bg-app-base')
content = content.replace('border-slate-800', 'border-app-border')
content = content.replace('text-slate-300', 'text-app-muted')
content = content.replace('hover:bg-slate-800', 'hover:bg-app-panel')
content = content.replace('hover:text-white', 'hover:text-app-text')
content = content.replace('text-white', 'text-app-text')
content = content.replace('bg-slate-800', 'bg-app-sidebar')

# Main Content
content = content.replace('text-slate-600', 'text-app-muted')
content = content.replace('hover:text-slate-900', 'hover:text-app-text')
content = content.replace('hover:border-slate-300', 'hover:border-app-muted')
content = content.replace('bg-slate-200', 'bg-app-border')
content = content.replace('hover:bg-slate-50', 'hover:bg-app-sidebar')
content = content.replace('border-slate-100', 'border-app-border')
content = content.replace('bg-slate-100', 'bg-app-sidebar')
content = content.replace('text-slate-700', 'text-app-text')

with open('app/page.tsx', 'w') as f:
    f.write(content)
