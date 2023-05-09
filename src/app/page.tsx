import ActionsPanel from "@/components/panels/actions";
import WelcomePanel from "@/components/panels/welcome";
import AnnouncementsPanel from "@/components/panels/announcements";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Index() {
  let session;

  try {
    const [sessionRes] = await Promise.allSettled([
      getServerSession(authOptions),
    ]);

    if (sessionRes.status === "fulfilled") {
      session = sessionRes.value;
    } else {
      console.error(sessionRes);
    }
  } catch (error) {
    console.error(error);
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Dashboard</h1>

          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left-2/3 column */}

            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <WelcomePanel />
              <ActionsPanel />
            </div>

            {/* right-1/3 column */}
            <div className="grid grid-cols-1 gap-4">
              <AnnouncementsPanel />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
