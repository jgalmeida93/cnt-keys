import connectMongoDB from "@/app/utils/mongo";
import Music from "@/models/Musics";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(): Promise<any> {
  await connectMongoDB();
  const musics = await Music.find();
  return NextResponse.json({ musics });
}

export async function POST(req: Request) {
  const { values } = await req.json();
  console.log(values);
  await connectMongoDB();
  const music = new Music({
    name: values.name,
    key: values.key,
  });
  // await Music.create({ name, key });
  const musicCreated = await music.save();

  return NextResponse.json({ message: "Music added" }, { status: 201 });
}
