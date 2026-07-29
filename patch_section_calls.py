import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'extractRepoName={extractRepoName}',
    'extractRepoName={extractRepoName}\n                  onItemSelected={setSelectedItem}'
)

with open('app/page.tsx', 'w') as f:
    f.write(content)
