import connectMongoDB from "@/app/utils/mongo";
import Music from "@/models/Musics";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const { newName: name, newKey: key } = await req.json();
  await connectMongoDB();
  await Music.findByIdAndUpdate(id, { name, key });
  return NextResponse.json({ message: "Music updated" }, { status: 200 });
}
