import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Let's clean up the bad replace
import re

content = re.sub(r'<div> <a \{\.\.\.props\} className="text-blue-500 hover:underline".*?</div>\s*>\s*\{selectedItem\.body \|\| "\*No description provided\.\*"\}\s*</div>', '<div>{selectedItem.body || "*No description provided.*"}</div>', content, flags=re.DOTALL)

content = re.sub(r'<div> <a \{\.\.\.props\} className="text-blue-500 hover:underline".*?</div>\s*>\s*\{comment\.body\}\s*</div>', '<div>{comment.body}</div>', content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)
