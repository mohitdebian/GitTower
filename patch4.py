import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace checkAuth
old_checkAuth = """  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/status');
      const authData = await res.json();
      setIsAuthenticated(authData.authenticated);
      if (authData.authenticated) {
        setUser(authData.user);
        fetchDashboard();
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  };"""

new_checkAuth = """  const checkAuth = async () => {
    // Mock authentication
    setIsAuthenticated(true);
    setUser({
      login: "developer",
      name: "Developer",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4"
    });
    fetchDashboard();
  };"""

content = content.replace(old_checkAuth, new_checkAuth)

# Replace fetchDashboard
old_fetchDashboard = """  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const dashboardData = await res.json();
        setData(dashboardData);
      }
    } catch (e) {
      console.error('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };"""

new_fetchDashboard = """  const fetchDashboard = async () => {
    setLoading(true);
    // Mock Data
    setTimeout(() => {
      setData({
        reviewRequested: [
          {
            id: 1,
            html_url: "#",
            title: "Implement useOptimistic hook primitives",
            number: 842,
            state: "open",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user: { login: "sophiebits", avatar_url: "https://avatars.githubusercontent.com/u/6820?v=4" },
            repository_url: "https://api.github.com/repos/facebook/react"
          }
        ],
        mentions: [
          {
            id: 2,
            html_url: "#",
            title: "What's the best way to handle...",
            number: 1205,
            state: "open",
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            user: { login: "jaredpalmer", avatar_url: "https://avatars.githubusercontent.com/u/4060187?v=4" },
            repository_url: "https://api.github.com/repos/vercel/turbo"
          }
        ],
        myPrs: [
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
        ],
        involved: [
          {
            id: 4,
            html_url: "#",
            title: "Review feedback from yesterday",
            number: 56,
            state: "open",
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            user: { login: "qwen", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4" },
            repository_url: "https://api.github.com/repos/qwen/paw"
          }
        ]
      });
      setLoading(false);
    }, 500);
  };"""

content = content.replace(old_fetchDashboard, new_fetchDashboard)

with open('app/page.tsx', 'w') as f:
    f.write(content)
