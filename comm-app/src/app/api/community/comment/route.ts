import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "src/app/supabase/page";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const supabase = await createClerkSupabaseClient();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { postId, text, replyingTo } = body;

    const { error } = await supabase.from("community_comments").insert([
      {
        user_id: user.id,
        post_id: postId,
        text,
        replying_to: replyingTo,
      },
    ]);

    if (error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Comment created successfuly", { status: 200 });
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClerkSupabaseClient();

  const postId: string = req.nextUrl.searchParams.get("postId") || "";

  try {
    const { data: postData, error: postError } = await supabase
      .from("community_post")
      .select("comments")
      .eq("id", postId);

    if (postError) {
      throw new Error();
    }

    const { data: commentsData, error: commentsError } = await supabase
      .from("community_comments")
      .select()
      .in("id", postData[0].comments);

    if (commentsError) {
      throw new Error();
    }

    commentsData.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(commentsData, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
