import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await req.json();
    const { type, repo, issueNumber, body } = payload;

    if (!type || !repo || !issueNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    let url = "";
    let method = "";
    let requestBody: any = null;

    switch (type) {
      case "COMMENT":
        url = `https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`;
        method = "POST";
        requestBody = { body };
        break;
      case "CLOSE":
        url = `https://api.github.com/repos/${repo}/issues/${issueNumber}`;
        method = "PATCH";
        requestBody = { state: "closed" };
        break;
      case "REOPEN":
        url = `https://api.github.com/repos/${repo}/issues/${issueNumber}`;
        method = "PATCH";
        requestBody = { state: "open" };
        break;
      case "MERGE":
        url = `https://api.github.com/repos/${repo}/pulls/${issueNumber}/merge`;
        method = "PUT";
        requestBody = {};
        break;
      default:
        return NextResponse.json({ error: "Unsupported action type" }, { status: 400 });
    }

    const response = await fetch(url, {
      method,
      headers,
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Action failed:", error);
    return NextResponse.json({ error: error.message || "Failed to execute action" }, { status: 500 });
  }
}
