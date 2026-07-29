import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'checkAuth();',
    'setTimeout(() => checkAuth(), 0);'
)

with open('app/page.tsx', 'w') as f:
    f.write(content)


with open('hooks/use-mobile.ts', 'r') as f:
    content2 = f.read()

content2 = content2.replace(
    'setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)',
    'setTimeout(() => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT), 0)'
)

with open('hooks/use-mobile.ts', 'w') as f:
    f.write(content2)
