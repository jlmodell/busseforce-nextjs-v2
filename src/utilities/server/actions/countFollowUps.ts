"use server";
import atlasClientPromise from "@/utilities/db/atlas";
import { ObjectId } from "mongodb";
import { type BusseUser } from "@/app/api/auth/[...nextauth]/route";

export default async function countFollowUps(user: BusseUser) {
  const client = await atlasClientPromise;
  const db = client.db("busseforce");
  const collection = db.collection("unified_tasks");

  const query = {
    $and: [
      { _user: new ObjectId(user._id) },
      { followUp: { $gte: new Date(Date.now()) } },
    ],
  };

  return collection.countDocuments(query);
}
