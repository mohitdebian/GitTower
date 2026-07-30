import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID || "",
    scope: "repo read:user user:email",
  });
  
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.json({ url });
}
