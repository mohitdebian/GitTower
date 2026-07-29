with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.strip() in [
        "import Markdown from 'react-markdown';",
        "import remarkGfm from 'remark-gfm';",
        "import { ArrowLeft } from 'lucide-react';"
    ]:
        if line not in new_lines:
            new_lines.append(line)
    else:
        new_lines.append(line)

with open('app/page.tsx', 'w') as f:
    f.writelines(new_lines)
