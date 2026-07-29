import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<Github className="w-6 h-6 text-app-text" />',
    '<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Github className="w-5 h-5" /></div>'
)

with open('app/page.tsx', 'w') as f:
    f.write(content)
