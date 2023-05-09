"use client";
import Link from "next/link";
import { Announcement } from "@/app/api/announcements/route";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AnnouncementsPanel() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  useEffect(() => {
    axios
      .get("/api/announcements")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch(console.error);
  });
  return (
    <section aria-labelledby="announcements-title">
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900"
            id="announcements-title"
          >
            Announcements
          </h2>
          <div className="flow-root mt-6">
            <ul className="-my-5 divide-y divide-gray-200">
              <li className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-sky-600">
                  <h3 className="text-sm text-slate-800">
                    <Link
                      href="/announcements"
                      className="hover:underline focus:outline-none"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {announcements.length > 0 && announcements[0].message}
                    </Link>
                  </h3>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <Link
              href="/announcements"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
