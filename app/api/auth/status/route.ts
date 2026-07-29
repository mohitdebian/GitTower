import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('github_token')?.value;
  
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }
  
  try {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!userResponse.ok) {
      // If token is invalid, we could clear it, but let's just return false
      return NextResponse.json({ authenticated: false });
    }
    
    const user = await userResponse.json();
    return NextResponse.json({ authenticated: true, user });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}
