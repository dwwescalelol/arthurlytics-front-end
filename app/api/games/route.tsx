import { cloudClient } from "@/lib/clients/cloud";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") ?? "1";
  const order = searchParams.get("order") ?? "";
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const data = await cloudClient.getAllGames({
    page,
    sort,
    order,
    search,
  });
  return NextResponse.json(data);
}
