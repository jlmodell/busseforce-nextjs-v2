import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import atlasClientPromise from "@/utilities/db/atlas";
import { z } from "zod";

const announcementSchema = z.object({
  title: z.string(),
  message: z.string(),
  createdAt: z.date(),
  author: z.string(),
  email: z.string().email(),
});

export type Announcement = z.infer<typeof announcementSchema>;

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Session not found");
  }
  const client = await atlasClientPromise;
  const db = client.db("busseforce");
  const collection = db.collection("announcements");

  const query = {};

  const announcements = (await collection
    .find(query, {
      sort: { createdAt: -1 },
    })
    .toArray()) as unknown as Announcement[];

  return NextResponse.json(announcements);
}
