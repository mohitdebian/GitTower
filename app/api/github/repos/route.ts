import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    // Fetch in parallel: user's own repos + repos they contributed to
    const [ownRes, contribRes, userRes] = await Promise.all([
      fetch("https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member", { headers }),
      fetch("https://api.github.com/user/repos?per_page=100&sort=pushed&type=all", { headers }),
      fetch("https://api.github.com/user", { headers }),
    ]);

    const ownRepos = ownRes.ok ? await ownRes.json() : [];
    const contribRepos = contribRes.ok ? await contribRes.json() : [];
    const userData = userRes.ok ? await userRes.json() : null;

    // Deduplicate by full_name
    const repoMap = new Map<string, any>();

    const processRepo = (repo: any) => {
      if (!repoMap.has(repo.full_name)) {
        repoMap.set(repo.full_name, {
          full_name: repo.full_name,
          name: repo.name,
          owner_login: repo.owner?.login,
          owner_avatar: repo.owner?.avatar_url,
          description: repo.description,
          private: repo.private,
          fork: repo.fork,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          stargazers_count: repo.stargazers_count,
          open_issues_count: repo.open_issues_count,
          language: repo.language,
        });
      }
    };

    ownRepos.forEach(processRepo);
    contribRepos.forEach(processRepo);

    // Also fetch starred repos to find repos user interacted with
    // (skipping for now to avoid rate limits — own + contrib covers most cases)

    const repos = Array.from(repoMap.values()).sort((a, b) => 
      new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime()
    );

    return NextResponse.json({ repos, user: userData?.login });
  } catch (error) {
    console.error("Error fetching repos:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
