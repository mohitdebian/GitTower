import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Filter sections
reviews_search = """                  items={data.reviewRequested}"""
reviews_replace = """                  items={data.reviewRequested.filter(item => !mutedRepos[extractRepoName(item.repository_url)])}"""
content = content.replace(reviews_search, reviews_replace)

mentions_search = """                  items={data.mentions}"""
mentions_replace = """                  items={data.mentions.filter(item => !mutedRepos[extractRepoName(item.repository_url)])}"""
content = content.replace(mentions_search, mentions_replace)

my_prs_search = """                  items={data.myPrs}"""
my_prs_replace = """                  items={data.myPrs.filter(item => !mutedRepos[extractRepoName(item.repository_url)])}"""
content = content.replace(my_prs_search, my_prs_replace)

involved_search = """                  items={data.involved}"""
involved_replace = """                  items={data.involved.filter(item => !mutedRepos[extractRepoName(item.repository_url)])}"""
content = content.replace(involved_search, involved_replace)

with open('app/page.tsx', 'w') as f:
    f.write(content)
