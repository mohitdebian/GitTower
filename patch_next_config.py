import re

with open('next.config.ts', 'r') as f:
    content = f.read()

# Make sure we don't accidentally pull in something weird
# In Next 15, there is a known issue where third party modules might use pages
# Let's try to disable experimental features
content = content.replace("experimental: {", "experimental: { /*")
content = content.replace("},", "*/ },")

with open('next.config.ts', 'w') as f:
    f.write(content)
