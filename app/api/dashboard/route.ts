import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('github_token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get authenticated user info first to use in queries if needed, though `@me` handles it.
  
  const queries = {
    reviewRequested: 'is:pr is:open review-requested:@me archived:false',
    mentions: 'is:open mentions:@me archived:false',
    myPrs: 'is:pr is:open author:@me archived:false',
    involved: 'is:issue is:open involves:@me -author:@me archived:false'
  };

  const results: Record<string, any> = {};

  try {
    await Promise.all(
      Object.entries(queries).map(async ([key, q]) => {
        const response = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=15`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          results[key] = data.items;
        } else {
          console.error(`Failed to fetch ${key}:`, response.status);
          results[key] = [];
        }
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
