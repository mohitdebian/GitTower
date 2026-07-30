import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const repo = url.searchParams.get("repo");
  const pullNumber = url.searchParams.get("pullNumber");

  if (!repo || !pullNumber) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Fetch the Pull Request to get the head sha
    const prRes = await fetch(`https://api.github.com/repos/${repo}/pulls/${pullNumber}`, { headers });
    if (!prRes.ok) {
      return NextResponse.json({ error: "Failed to fetch pull request" }, { status: prRes.status });
    }
    const prData = await prRes.json();
    const sha = prData.head?.sha;

    if (!sha) {
      return NextResponse.json({ error: "Pull request has no head SHA" }, { status: 400 });
    }

    // 2. Fetch the check runs for that sha
    const checksRes = await fetch(`https://api.github.com/repos/${repo}/commits/${sha}/check-runs`, { headers });
    if (!checksRes.ok) {
      return NextResponse.json({ error: "Failed to fetch checks" }, { status: checksRes.status });
    }
    const checksData = await checksRes.json();

    // Calculate summary
    const total = checksData.total_count || 0;
    const runs = checksData.check_runs || [];
    
    let failed = 0;
    let pending = 0;
    let success = 0;
    let waiting_approval = 0;

    const successful_runs: any[] = [];
    const failed_runs: any[] = [];
    const pending_runs: any[] = [];
    const skipped_runs: any[] = [];

    runs.forEach((run: any) => {
      const runData = {
        id: run.id,
        name: run.name,
        status: run.status,
        conclusion: run.conclusion,
        html_url: run.html_url,
        completed_at: run.completed_at,
        started_at: run.started_at,
        app_name: run.app?.name || 'GitHub Actions'
      };

      if (run.status === "completed") {
        if (run.conclusion === "skipped") {
          skipped_runs.push(runData);
        } else if (run.conclusion === "success" || run.conclusion === "neutral") {
          success++;
          successful_runs.push(runData);
        } else {
          failed++;
          failed_runs.push(runData);
        }
      } else {
        if (run.status === "waiting" || run.conclusion === "action_required") {
          waiting_approval++;
        }
        pending++;
        pending_runs.push(runData);
      }
    });

    let state = "pending";
    if (failed > 0) state = "failure";
    else if (pending === 0 && total > 0) state = "success";
    else if (total === 0) state = "none";

    return NextResponse.json({
      state,
      total,
      failed,
      pending,
      success,
      waiting_approval,
      mergeable: prData.mergeable,
      mergeable_state: prData.mergeable_state,
      requested_reviewers: prData.requested_reviewers || [],
      permissions: prData.base?.repo?.permissions || {},
      successful_runs,
      skipped_runs,
      failed_runs,
      pending_runs,
    });
  } catch (error) {
    console.error("Error fetching checks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
