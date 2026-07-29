import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('className="w-16 h-16 bg-app-base rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md"', 'className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md"')
content = content.replace('className="w-8 h-8 text-app-text"', 'className="w-8 h-8 text-white"')
content = content.replace('className="w-full flex items-center justify-center gap-3 bg-app-base hover:bg-app-panel text-app-text font-medium py-3 px-6 rounded-xl transition-all active:scale-[0.98]"', 'className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all active:scale-[0.98]"')

with open('app/page.tsx', 'w') as f:
    f.write(content)
