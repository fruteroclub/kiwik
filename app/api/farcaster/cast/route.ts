import { NextRequest, NextResponse } from "next/server";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

// Initialize Neynar client
const client = new NeynarAPIClient({
  apiKey: process.env.NEYNAR_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, signerUuid } = body;

    if (!text || !signerUuid) {
      return NextResponse.json(
        { error: "Texto y signerUuid son requeridos" },
        { status: 400 },
      );
    }

    if (!process.env.NEYNAR_API_KEY) {
      return NextResponse.json(
        { error: "API key de Neynar no configurada" },
        { status: 500 },
      );
    }

    // Publish the cast
    const castResponse = await client.publishCast({
      signerUuid,
      text,
    });

    return NextResponse.json({
      success: true,
      cast: castResponse.cast,
    });

  } catch (error) {
    console.error("Error publishing cast:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al publicar cast: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}