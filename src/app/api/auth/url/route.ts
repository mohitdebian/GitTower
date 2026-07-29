import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { origin } = new URL(req.url);
  const redirectUri = `${origin}/api/auth/callback`;
  
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID || "",
    scope: "repo read:user user:email",
    redirect_uri: redirectUri,
  });
  
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.json({ url });
}
