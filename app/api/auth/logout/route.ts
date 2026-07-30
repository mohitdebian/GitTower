import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("gittower_github_token");
  
  return NextResponse.json({ success: true });
}
