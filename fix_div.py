import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# We broke something with the regex replace earlier
# Let's fix the invalid jsx

content = content.replace("<div>\n                             remarkPlugins={[remarkGfm]}\n                             components={{", "")
content = content.replace("<div>\n                               remarkPlugins={[remarkGfm]}\n                               components={{", "")

# The problem is the props on the div
content = re.sub(r'<div>\s*remarkPlugins=\S*\s*components=\{[^}]*\}\s*>', '<div>', content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)
