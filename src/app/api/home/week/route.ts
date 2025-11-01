import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "New York";
  const base = process.env.BACKEND_URL!;

  try {
    const res = await fetch(`${base}/api/v1/home/week?city=${encodeURIComponent(city)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Backend error ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Next API /home/today]", err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
