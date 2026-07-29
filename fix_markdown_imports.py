import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("// import Markdown from 'react-markdown';", "import Markdown from 'react-markdown';")
content = content.replace("// import remarkGfm from 'remark-gfm';", "import remarkGfm from 'remark-gfm';")

with open('app/page.tsx', 'w') as f:
    f.write(content)
