import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('<div className="flex-1 relative min-w-0 pb-32">', '<div className="flex-1 relative min-w-0 pb-8">')

with open('app/page.tsx', 'w') as f:
    f.write(content)
