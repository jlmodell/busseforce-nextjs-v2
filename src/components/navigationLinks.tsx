"use client";

import Link from "next/link";
import { Fragment } from "react";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { z } from "zod";

export const navigationSchema = z.object({
  name: z.string(),
  href: z.string(),
  segment: z.string().nullable(),
});

export type NavigationLink = z.infer<typeof navigationSchema>;

const navigation: NavigationLink[] = [
  { name: "Dashboard", href: "/", segment: null },
  { name: "Announcements", href: "/announcements", segment: "announcements" },
  { name: "Actions", href: "/actions", segment: "actions" },
  { name: "Contacts", href: "/contacts", segment: "contacts" },
  { name: "Opportunities", href: "/opportunities", segment: "opportunities" },
];

export default function NavigationLinks() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex space-x-4">
      {navigation.map((item) => (
        <Fragment key={item.name}>
          <Link
            href={item.href}
            className={clsx(
              segment === item.segment
                ? "text-white font-semibold border-b-2 border-white drop-shadow-lg rounded-b-none"
                : "text-sky-100 font-light",
              "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
            )}
          >
            {item.name}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
