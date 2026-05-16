import { client } from "@/lib/clients";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") ?? "1";
  const order = searchParams.get("order") ?? "";
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const sites = searchParams.get("sites") ?? "";
  const tags = searchParams.get("tags") ?? "";

  try {
    const data = await client.getAllGames({ page, sort, order, search, sites, tags });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ data: null, meta: { page: 1, count: 0, totalPages: 0 } }, { status: 500 });
  }
}
