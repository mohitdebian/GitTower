import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

old_box = """                  {/* Floating Reply Box */}
                  <div className="fixed bottom-6 w-full max-w-[calc(1024px-200px)] lg:max-w-[calc(1024px-350px)] z-20">
                    <div className="bg-app-panel border border-app-border rounded-xl shadow-lg p-2">"""

new_box = """                  {/* Floating Reply Box */}
                  <div className="sticky bottom-6 z-20 pt-2">
                    <div className="bg-app-panel border border-app-border rounded-xl shadow-xl p-2">"""

content = content.replace(old_box, new_box)

with open('app/page.tsx', 'w') as f:
    f.write(content)
