with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "const [selectedItem, setSelectedItem] = useState<GitHubIssue | null>(null);" in line:
        if line not in new_lines:
            new_lines.append(line)
    else:
        new_lines.append(line)

with open('app/page.tsx', 'w') as f:
    f.writelines(new_lines)
