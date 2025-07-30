import { NextRequest, NextResponse } from "next/server";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

// Remove the interface since we'll use the SDK's Cast type directly

// Initialize Neynar client with proper configuration object
const client = new NeynarAPIClient({
  apiKey: process.env.NEYNAR_API_KEY || "",
});

// Create - POST
// Read - GET
// Update - PUT/PATCH
// Delete - DELETE

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username es requerido" },
        { status: 400 },
      );
    }

    if (!process.env.NEYNAR_API_KEY) {
      return NextResponse.json(
        { error: "API key de Neynar no configurada" },
        { status: 500 },
      );
    }

    // Search for user by username
    const userResponse = await client.searchUser({ q: username, limit: 1 });

    if (!userResponse.result.users || userResponse.result.users.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    const user = userResponse.result.users[0];

    // Get detailed user information
    const userDetails = await client.fetchBulkUsers({ fids: [user.fid] });
    const detailedUser = userDetails.users[0];

    // Get user's last 5 casts
    let userCasts: Array<{
      hash: string;
      text: string;
      timestamp: string;
      reactions_count: number;
      recasts_count: number;
      replies_count: number;
      embeds: Array<{ url?: string; cast_id?: { fid: number; hash: string } }>;
      parent_hash?: string;
    }> = [];
    
    try {
      const castsResponse = await client.fetchCastsForUser({
        fid: detailedUser.fid,
        limit: 5,
        includeReplies: false,
      });

      userCasts = castsResponse.casts.map((cast) => ({
        hash: cast.hash,
        text: cast.text,
        timestamp: cast.timestamp,
        reactions_count: cast.reactions?.likes_count || 0,
        recasts_count: cast.reactions?.recasts_count || 0,
        replies_count: cast.replies?.count || 0,
        embeds: cast.embeds || [],
        parent_hash: cast.parent_hash || undefined,
      }));
    } catch (castsError) {
      console.error("Error fetching casts:", castsError);
      // Continue without casts if error occurs
    }

    // Format response
    const formattedUser = {
      fid: detailedUser.fid,
      username: detailedUser.username,
      display_name: detailedUser.display_name,
      pfp_url: detailedUser.pfp_url,
      follower_count: detailedUser.follower_count,
      following_count: detailedUser.following_count,
      bio: detailedUser.profile?.bio?.text || "",
      casts: userCasts,
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    console.error("Error fetching Farcaster user:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al obtener usuario: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
