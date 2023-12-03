import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const res = await fetch(`http://localhost:3001/api/question/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
}
