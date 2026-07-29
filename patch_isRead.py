import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Add isRead to GitHubIssue
content = content.replace(
    "  related_issue?: {",
    "  isRead?: boolean;\n  related_issue?: {"
)

# 2. Add handleItemSelected
handle_fn = """  const handleItemSelected = (item: GitHubIssue) => {
    setSelectedItem(item);
    if (data) {
      const newData = { ...data };
      let updated = false;
      (['reviewRequested', 'mentions', 'myPrs', 'involved'] as const).forEach(key => {
        newData[key] = newData[key].map(i => {
          if (i.id === item.id && !i.isRead) {
            updated = true;
            return { ...i, isRead: true };
          }
          return i;
        });
      });
      if (updated) {
        setData(newData);
      }
    }
  };"""

content = content.replace("  const fetchDashboard = async () => {", handle_fn + "\n\n  const fetchDashboard = async () => {")

# 3. Use handleItemSelected instead of setSelectedItem for Sections
content = content.replace("onItemSelected={setSelectedItem}", "onItemSelected={handleItemSelected}")

# 4. Add blue dot indicator in Section component
old_title = """                    <h3 className="text-[15px] font-medium text-app-text truncate pr-4 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>"""
new_title = """                    <h3 className="text-[15px] font-medium text-app-text truncate pr-4 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                      {!item.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" title="Unread"></span>}
                      <span className="truncate">{item.title}</span>
                    </h3>"""
content = content.replace(old_title, new_title)

with open('app/page.tsx', 'w') as f:
    f.write(content)
