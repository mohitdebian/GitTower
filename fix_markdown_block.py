import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Fix the first broken div block
broken_div_1 = r'<div> <a \{\.\.\.props\}.*?return <code className=\{className\} \{\.\.\.props\}>\{children\}</code>;\n\s*\}\n\s*\}\}\n\s*>\n\s*\{selectedItem\.body \|\| "\*No description provided\.\*"\}\n\s*</div>'

content = re.sub(broken_div_1, r'<div>{selectedItem.body || "*No description provided.*"}</div>', content, flags=re.DOTALL)

broken_div_2 = r'<div> <a \{\.\.\.props\}.*?return <code className=\{className\} \{\.\.\.props\}>\{children\}</code>;\n\s*\}\n\s*\}\}\n\s*>\n\s*\{comment\.body\}\n\s*</div>'

content = re.sub(broken_div_2, r'<div>{comment.body}</div>', content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)
