import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "src/app/supabase/clerkSupabaseClient";

export async function GET(req: NextRequest) {
  const supabase = await createClerkSupabaseClient();

  try {
    const { data, error } = await supabase.from("community_post").select();

    if (error) {
      throw new Error();
    }

    data.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
