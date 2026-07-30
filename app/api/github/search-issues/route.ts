import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const repo = url.searchParams.get("repo");
  const query = url.searchParams.get("q") || "";

  if (!repo) {
    return NextResponse.json({ error: "Missing repo parameter" }, { status: 400 });
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

    // We search for both issues and PRs in the given repo
    const searchQuery = `repo:${repo} ${query}`;
    const res = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(searchQuery)}&sort=updated&order=desc&per_page=5`, { headers });
    
    if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);
    
    const data = await res.json();
    return NextResponse.json(data.items);
  } catch (error) {
    console.error("Search issues error:", error);
    return NextResponse.json({ error: "Failed to search issues" }, { status: 500 });
  }
}
