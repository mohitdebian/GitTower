import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Add state
state_search = "  const [activeView, setActiveView] = useState<'inbox' | 'reviews' | 'mentions' | 'my-prs' | 'involved' | 'manage-repos'>('inbox');"
state_replace = state_search + "\n  const [mutedRepos, setMutedRepos] = useState<Record<string, boolean>>({'vercel/next.js': true});"
content = content.replace(state_search, state_replace)

# 2. Update mapping
mapping_search = """                  {[
                    { name: 'facebook/react', muted: false },
                    { name: 'vercel/next.js', muted: true },
                    { name: 'rust-lang/rust', muted: false },
                    { name: 'qwen/paw', muted: false }
                  ].map((repo, i) => ("""

mapping_replace = """                  {[
                    { name: 'facebook/react' },
                    { name: 'vercel/next.js' },
                    { name: 'rust-lang/rust' },
                    { name: 'qwen/paw' }
                  ].map((repo, i) => ("""
content = content.replace(mapping_search, mapping_replace)

# 3. Update input
input_search = """<input type="checkbox" className="sr-only peer" defaultChecked={repo.muted} />"""
input_replace = """<input type="checkbox" className="sr-only peer" checked={!!mutedRepos[repo.name]} onChange={() => setMutedRepos(prev => ({...prev, [repo.name]: !prev[repo.name]}))} />"""
content = content.replace(input_search, input_replace)

with open('app/page.tsx', 'w') as f:
    f.write(content)
