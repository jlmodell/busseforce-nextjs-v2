"use server";
import atlasClientPromise from "@/utilities/db/atlas";
import { ObjectId } from "mongodb";
import { type BusseUser } from "@/app/api/auth/[...nextauth]/route";

export default async function countOpportunities(user: BusseUser) {
  const client = await atlasClientPromise;
  const db = client.db("busseforce");
  const collection = db.collection("opportunities");

  const query = {
    $and: [{ _user: new ObjectId(user._id) }, { status: "open" }],
  };

  return collection.countDocuments(query);
}
