import { getAllGames } from "@/lib/games";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") ?? "1";
  const sort = searchParams.get("sort") ?? "";

  const data = await getAllGames(sort, page);
  return NextResponse.json(data);
}
