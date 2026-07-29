import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Add recent_activity to GitHubIssue
issue_type = """  isRead?: boolean;
  related_issue?: {"""
new_issue_type = """  isRead?: boolean;
  recent_activity?: {
    action: string;
    user: { login: string; avatar_url: string };
    created_at: string;
  };
  related_issue?: {"""
content = content.replace(issue_type, new_issue_type)

# 2. Add recent_activity to mock data
mock_pr_1 = """            repository_url: "https://api.github.com/repos/rust-lang/rust",
            related_issue: {"""
new_mock_pr_1 = """            repository_url: "https://api.github.com/repos/rust-lang/rust",
            recent_activity: {
              action: "left a review on your PR",
              user: { login: "rust-reviewer", avatar_url: "https://avatars.githubusercontent.com/u/10?v=4" },
              created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
            },
            related_issue: {"""
content = content.replace(mock_pr_1, new_mock_pr_1)

mock_pr_2 = """            repository_url: "https://api.github.com/repos/vercel/next.js",
            related_issue: {"""
new_mock_pr_2 = """            repository_url: "https://api.github.com/repos/vercel/next.js",
            recent_activity: {
              action: "commented on your PR",
              user: { login: "leerob", avatar_url: "https://avatars.githubusercontent.com/u/11?v=4" },
              created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            related_issue: {"""
content = content.replace(mock_pr_2, new_mock_pr_2)

with open('app/page.tsx', 'w') as f:
    f.write(content)
