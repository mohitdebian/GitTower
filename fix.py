import re
with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace the second occurrence
parts = content.split('                          <div>{selectedItem.body || "*No description provided.*"}</div>')
if len(parts) == 3:
    content = parts[0] + '                          <div>{selectedItem.body || "*No description provided.*"}</div>' + parts[1] + '                          <div>{comment.body}</div>' + parts[2]

with open('app/page.tsx', 'w') as f:
    f.write(content)
