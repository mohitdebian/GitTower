import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const reposParam = url.searchParams.get("repos");
  const actorParam = url.searchParams.get("actor");

  if (!reposParam) {
    return NextResponse.json({ error: "Missing repos parameter" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const repos = reposParam.split(",").map(r => r.trim()).filter(Boolean);
  
  if (repos.length === 0) {
    return NextResponse.json({ active: [], failed: [] });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  const active: any[] = [];
  const failed: any[] = [];

  // Limit to max 10 repos to avoid hitting rate limits or timeouts
  const reposToFetch = Array.from(new Set(repos)).slice(0, 10);

  try {
    const fetchPromises = reposToFetch.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}/actions/runs?per_page=10`, { headers });
        if (!res.ok) return;
        
        const data = await res.json();
        const runs = data.workflow_runs || [];
        
        runs.forEach((run: any) => {
          // Skip runs older than 24 hours to avoid stale data
          const isStale = (new Date().getTime() - new Date(run.created_at).getTime()) > 24 * 60 * 60 * 1000;
          if (isStale) return;

          // Only include workflows triggered by the current user if actorParam is provided
          if (actorParam && run.actor?.login && run.actor.login.toLowerCase() !== actorParam.toLowerCase()) {
            return;
          }

          const runData = {
            id: run.id,
            name: run.name,
            repo: repo,
            status: run.status,
            conclusion: run.conclusion,
            html_url: run.html_url,
            created_at: run.created_at,
            actor_avatar: run.actor?.avatar_url || ''
          };

          if (run.status === "in_progress" || run.status === "queued" || run.status === "waiting") {
            active.push(runData);
          } else if (run.status === "completed" && (run.conclusion === "failure" || run.conclusion === "timed_out" || run.conclusion === "action_required" || run.conclusion === "cancelled")) {
            failed.push(runData);
          }
        });
      } catch (err) {
        // Ignore individual repo fetch errors
      }
    });

    await Promise.all(fetchPromises);

    // Sort active by created_at desc (newest first)
    active.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    // Sort failed by created_at desc
    failed.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ 
      active: active.slice(0, 10), // Limit to 10 active globally
      failed: failed.slice(0, 10)  // Limit to 10 failed globally
    });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
