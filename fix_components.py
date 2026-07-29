import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace the mangled comment
content = content.replace("setActiveView('inbox'); setSelectedItem(null);  */ }}", "setActiveView('inbox'); setSelectedItem(null); }}")
content = content.replace("setActiveView('reviews'); setSelectedItem(null);  */ }}", "setActiveView('reviews'); setSelectedItem(null); }}")
content = content.replace("setActiveView('mentions'); setSelectedItem(null);  */ }}", "setActiveView('mentions'); setSelectedItem(null); }}")
content = content.replace("setActiveView('my-prs'); setSelectedItem(null);  */ }}", "setActiveView('my-prs'); setSelectedItem(null); }}")
content = content.replace("setActiveView('involved'); setSelectedItem(null);  */ }}", "setActiveView('involved'); setSelectedItem(null); }}")
content = content.replace("setActiveView('manage-repos'); setSelectedItem(null);  */ }}", "setActiveView('manage-repos'); setSelectedItem(null); }}")

content = content.replace("components={{ /* ", "components={{")
content = content.replace(" *\/ }} >", "}} >")
content = content.replace(" *\/ }}\n", "}}\n")

with open('app/page.tsx', 'w') as f:
    f.write(content)
