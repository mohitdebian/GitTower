import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Let's completely remove react-markdown for a second to see if that's what's using useContext in a bad way
search = "import Markdown from 'react-markdown';"
replace = "// import Markdown from 'react-markdown';"
content = content.replace(search, replace)

search = "import remarkGfm from 'remark-gfm';"
replace = "// import remarkGfm from 'remark-gfm';"
content = content.replace(search, replace)

# Find Markdown blocks and replace them with just pre
# There are several Markdown blocks, we can just replace all <Markdown ...> ... </Markdown> with simple div
import re
content = re.sub(r'<Markdown.*?>', '<div>', content, flags=re.DOTALL)
content = re.sub(r'</Markdown>', '</div>', content)


with open('app/page.tsx', 'w') as f:
    f.write(content)
