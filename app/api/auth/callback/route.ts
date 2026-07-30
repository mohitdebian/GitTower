import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new NextResponse("No code provided", { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Missing GitHub OAuth credentials in environment");
    return new NextResponse("Internal server error", { status: 500 });
  }

  // Use APP_URL if set, otherwise fall back to Vercel production URL, then request host
  const baseUrl = process.env.APP_URL 
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || `${url.protocol}//${url.host}`;
  const redirectUri = `${baseUrl}/api/auth/callback`;

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("GitHub OAuth Error:", data.error_description);
      return new NextResponse(`OAuth Error: ${data.error_description}`, { status: 400 });
    }

    const accessToken = data.access_token;

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("gittower_github_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Return HTML that messages the opener window and closes itself
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating...</title>
        </head>
        <body>
          <p>Authentication successful! Closing window...</p>
          <script>
            window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("OAuth callback failed:", error);
    return new NextResponse("Authentication failed", { status: 500 });
  }
}
