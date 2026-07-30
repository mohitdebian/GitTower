import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const repo = url.searchParams.get("repo");
  const issueNumber = url.searchParams.get("issueNumber");

  if (!repo || !issueNumber) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}/timeline?per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.full+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch timeline:", error);
    return NextResponse.json({ error: "Failed to fetch timeline" }, { status: 500 });
  }
}
