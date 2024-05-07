import { currentUser } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "src/app/supabase/clerkSupabaseClient";

export async function POST(req: any) {
  const user = await currentUser();
  const supabase = await createClerkSupabaseClient();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { title, content, tag } = body;

    const { error } = await supabase.from("community_post").insert([
      {
        user_id: user.id,
        username: user.username,
        title: title,
        content: content,
        tag: tag,
        likes: [],
      },
    ]);

    if (error) {
      return new Response("Error", { status: 500 });
    }
    return new Response("Post created successfuly", { status: 200 });
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClerkSupabaseClient();

  const postId: string = req.nextUrl.searchParams.get("postId") || "";

  try {
    const { data, error } = await supabase
      .from("community_post")
      .select()
      .limit(1)
      .eq("id", postId);

    if (error) {
      throw new Error();
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
