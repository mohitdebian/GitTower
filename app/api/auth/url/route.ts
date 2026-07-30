import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const reqUrl = new URL(req.url);
  
  // Use APP_URL if set, otherwise fall back to Vercel production URL, then request host
  const baseUrl = process.env.APP_URL 
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || `${reqUrl.protocol}//${reqUrl.host}`;
  const redirectUri = `${baseUrl}/api/auth/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID || "",
    redirect_uri: redirectUri,
    scope: "repo read:user user:email",
  });
  
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.json({ url });
}
