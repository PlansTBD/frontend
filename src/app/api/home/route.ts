import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Milan";

  const base = process.env.BACKEND_URL!;
  try {
    // 🔹 Chiami direttamente l’endpoint backend /api/v1/home
    const res = await fetch(`${base}/api/v1/home?city=${encodeURIComponent(city)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Backend /home error: ${res.status}`);
    }

    const json = await res.json();

    // 🔹 Il backend restituisce già sections.eventsToday / eventsWeek / placesTop
    return NextResponse.json({
      city: json.city,
      sections: json.sections,
    });
  } catch (err) {
    console.error("[Next API /home]", err);
    return NextResponse.json(
      {
        city,
        sections: {
          venues: [],
          restaurants: [],
          bars: [],
        },
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
