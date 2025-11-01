import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "New York";
  const base = process.env.BACKEND_URL!;

  try {
    // 🔹 Chiamate in parallelo alle tre rotte del backend
    const [todayRes, weekRes, placesRes] = await Promise.allSettled([
      fetch(`${base}/api/v1/home/today?city=${encodeURIComponent(city)}`, { cache: "no-store" }),
      fetch(`${base}/api/v1/home/week?city=${encodeURIComponent(city)}`, { cache: "no-store" }),
      fetch(`${base}/api/v1/home/places?city=${encodeURIComponent(city)}`, { cache: "no-store" }),
    ]);

    // helper per estrarre json in sicurezza
    const parseJSON = async (res: any) =>
      res.status === "fulfilled" && res.value.ok ? await res.value.json() : { results: [] };

    const todayData = await parseJSON(todayRes);
    const weekData = await parseJSON(weekRes);
    const placesData = await parseJSON(placesRes);

    // 🔹 Risposta coerente con il frontend (3 sezioni)
    const response = {
      city,
      sections: [
        {
          title: `Eventi di oggi a ${city}`,
          items: todayData.results ?? [],
        },
        {
          title: `Eventi della settimana a ${city}`,
          items: weekData.results ?? [],
        },
        {
          title: `I migliori locali e bar a ${city}`,
          items: placesData.results ?? [],
        },
      ],
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("[Next API /home]", err);
    return NextResponse.json(
      {
        city,
        sections: [
          { title: `Eventi di oggi a ${city}`, items: [] },
          { title: `Eventi della settimana a ${city}`, items: [] },
          { title: `I migliori locali e bar a ${city}`, items: [] },
        ],
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
