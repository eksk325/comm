import { currentUser } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { createClerkSupabaseClient } from "src/app/supabase/clerkSupabaseClient";

export async function PATCH(req: NextRequest) {
  const user = await currentUser();
  const supabase = await createClerkSupabaseClient();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = user.id;
  const postId: string = req.nextUrl.searchParams.get("postId") || "";

  if (req.method === "PATCH") {
    const { data, error: postError } = await supabase
      .from("community_post")
      .select("likes")
      .eq("id", postId);

    if (postError || !data) {
      return new Response("Error", { status: 500 });
    }

    const likes: string[] = data[0].likes;
    const finalLikes = likes;

    const index = finalLikes.indexOf(userId);

    if (index === -1) {
      finalLikes.push(userId);
    } else {
      finalLikes.splice(index, 1);
    }

    console.log(finalLikes);

    const { error } = await supabase
      .from("community_post")
      .update([
        {
          likes: finalLikes,
        },
      ])
      .eq("id", postId);

    console.log(error);

    if (error) {
      return new Response("Error", { status: 500 });
    }
    return new Response("Post created successfuly", { status: 200 });
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
}
