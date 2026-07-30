import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.full+json",
    };

    // Helper to fetch search API
    const fetchSearch = async (query: string) => {
      const res = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=15`, { headers });
      if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);
      const data = await res.json();
      return data.items;
    };

    // Fetch the 5 categories concurrently
    const [reviewRequested, mentions, myPrs, involved, assigned] = await Promise.all([
      fetchSearch("is:pr is:open review-requested:@me"),
      fetchSearch("is:open mentions:@me"),
      fetchSearch("is:pr is:open author:@me"),
      fetchSearch("is:open involves:@me -author:@me"),
      fetchSearch("is:open assignee:@me"),
    ]);

    return NextResponse.json({
      reviewRequested,
      mentions,
      myPrs,
      involved,
      assigned,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
