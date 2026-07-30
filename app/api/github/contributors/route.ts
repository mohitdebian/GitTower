import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const repo = url.searchParams.get("repo");

  if (!repo) {
    return NextResponse.json({ error: "Missing repo parameter" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // We only need login and avatar_url
    const contributors = data.map((c: any) => ({
      login: c.login,
      avatar_url: c.avatar_url,
    }));

    return NextResponse.json(contributors);
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return NextResponse.json({ error: "Failed to fetch contributors" }, { status: 500 });
  }
}
