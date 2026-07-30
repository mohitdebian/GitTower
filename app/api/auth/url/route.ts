import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const reqUrl = new URL(req.url);
  
  // Handle Vercel deployments where req.url might be HTTP internally but external is HTTPS
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : reqUrl.protocol;
  const host = process.env.VERCEL_URL || reqUrl.host;
  const redirectUri = `${protocol}://${host}/api/auth/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID || "",
    redirect_uri: redirectUri,
    scope: "repo read:user user:email",
  });
  
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.json({ url });
}
