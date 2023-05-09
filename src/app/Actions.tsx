"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { BusseUser } from "./api/auth/[...nextauth]/route";

export function SignIn() {
  return (
    <button
      onClick={() =>
        signIn("credentials", {
          email: "jmodell@busseinc.com",
          password: "5T1aBQa7",
        })
      }
    >
      Sign In
    </button>
  );
}

export function SignOut() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <button onClick={() => signOut()}>
      {(session?.user as BusseUser)?.Username} Sign Out
    </button>
  );
}
