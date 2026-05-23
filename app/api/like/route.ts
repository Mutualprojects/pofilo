import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: "6q773bw1",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false, // Mutating requests shouldn't be cached
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { postId, action } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const increment = action === "unlike" ? -1 : 1;

    // Mutate the document in Sanity: Ensure 'likes' exists, then increment/decrement
    const result = await writeClient
      .patch(postId)
      .setIfMissing({ likes: 0 })
      .inc({ likes: increment })
      .commit();

    return NextResponse.json({ success: true, likes: result.likes });
  } catch (error) {
    console.error("Failed to update likes in Sanity:", error);
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
  }
}
