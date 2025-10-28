import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !/[^@\s]+@[^@\s]+\.[^@\s]+/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE! // server-only, NON esposta al client
  );

  const { error } = await supabase.from("emails").upsert({ email }, { onConflict: "email" });
  if (error) return NextResponse.json({ error: "save_failed" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
