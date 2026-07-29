import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Update type
old_type = """  pull_request?: any;
  repository_url: string;
};"""

new_type = """  pull_request?: any;
  repository_url: string;
  related_issue?: {
    number: number;
    title: string;
    html_url: string;
  };
};"""
content = content.replace(old_type, new_type)

# Update mock data
old_prs = """        myPrs: [
          {
            id: 3,
            html_url: "#",
            title: "feat: Add ultra-fast parser",
            number: 4421,
            state: "open",
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
            repository_url: "https://api.github.com/repos/rust-lang/rust"
          },
          {
            id: 5,
            html_url: "#",
            title: "fix: Memory leak in SSR",
            number: 881,
            state: "open",
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
            repository_url: "https://api.github.com/repos/vercel/next.js"
          }
        ],"""

new_prs = """        myPrs: [
          {
            id: 3,
            html_url: "#",
            title: "feat: Add ultra-fast parser",
            number: 4421,
            state: "open",
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
            repository_url: "https://api.github.com/repos/rust-lang/rust",
            related_issue: {
              number: 4420,
              title: "Parser is too slow on large files",
              html_url: "#"
            }
          },
          {
            id: 5,
            html_url: "#",
            title: "fix: Memory leak in SSR",
            number: 881,
            state: "open",
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            user: { login: "developer", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" },
            repository_url: "https://api.github.com/repos/vercel/next.js",
            related_issue: {
              number: 875,
              title: "Process runs out of memory after 1 hour",
              html_url: "#"
            }
          }
        ],"""
content = content.replace(old_prs, new_prs)

with open('app/page.tsx', 'w') as f:
    f.write(content)
