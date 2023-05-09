import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { BusseUser, authOptions } from "../../auth/[...nextauth]/route";
import countOpportunities from "@/utilities/server/actions/countOpportunities";
import countFollowUps from "@/utilities/server/actions/countFollowUps";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  const followUpCount = (await countFollowUps(session?.user as BusseUser)) ?? 0;
  const opportunitiesCount =
    (await countOpportunities(session?.user as BusseUser)) ?? 0;

  return NextResponse.json({ followUpCount, opportunitiesCount });
}
