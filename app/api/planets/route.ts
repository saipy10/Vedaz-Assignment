import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { date, time, latitude, longitude, timezone } = body;

    const [year, month, day] = body.date.split("-").map(Number);
    const [hours, minutes] = body.time.split(":").map(Number);

    const res = await fetch("https://json.freeastrologyapi.com/planets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ASTROLOGY_API_KEY as string,
      },
      body: JSON.stringify({
        year,
        month,
        date: day,
        hours,
        minutes,
        seconds: 0,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone: parseFloat(timezone),
        settings: { observation_point: "topocentric", ayanamsha: "lahiri" },
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch Rasi Chart" }, { status: 500 });
  }
}
