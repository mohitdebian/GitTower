import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new NextResponse('Missing code', { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      })
    });

    const data = await tokenResponse.json();
    
    if (data.access_token) {
      const cookieStore = await cookies();
      cookieStore.set('github_token', data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
    }

    const htmlString = '<!DOCTYPE html>\n<html' + '>\n<body>\n' +
      '<script>\n' +
      '  if (window.opener) {\n' +
      '    window.opener.postMessage({ type: "OAUTH_AUTH_SUCCESS" }, "*");\n' +
      '    window.close();\n' +
      '  } else {\n' +
      '    window.location.href = "/";\n' +
      '  }\n' +
      '</script>\n' +
      '<p>Authentication successful. This window should close automatically.</p>\n' +
      '</body>\n</html' + '>';

    return new NextResponse(htmlString, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
