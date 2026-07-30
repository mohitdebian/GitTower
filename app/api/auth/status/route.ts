import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gittower_github_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      // Token is likely invalid or expired, clear it
      cookieStore.delete("gittower_github_token");
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await response.json();

    return NextResponse.json({
      authenticated: true,
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
      },
    });
  } catch (error) {
    console.error("Failed to verify user:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
