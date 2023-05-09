"use client";

import { type BusseUser } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function WelcomePanel() {
  const { data: session } = useSession();

  const [data, setData] = useState({
    followUpCount: 0,
    opportunitiesCount: 0,
  });

  useEffect(() => {
    axios
      .get("/api/actions/readonly")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section aria-labelledby="user-overview-title">
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <h2 className="sr-only" id="user-overview-title">
          User overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={(session?.user as BusseUser)?.Image}
                  alt=""
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {(session?.user as BusseUser)?.FirstName}{" "}
                  {(session?.user as BusseUser)?.LastName}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Sales Representative
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <Link
                href="/"
                className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <div className="px-6 py-5 text-sm font-medium text-center">
            <span className="text-gray-900">{data.followUpCount}</span>{" "}
            <span className="text-gray-600">Follow Ups</span>
          </div>
          <div className="px-6 py-5 text-sm font-medium text-center">
            <span className="text-gray-900">{data.opportunitiesCount}</span>{" "}
            <span className="text-gray-600">Opportunities</span>
          </div>
          <div className="px-6 py-5 text-sm font-medium text-center">
            <span className="text-gray-900">0</span>{" "}
            <span className="text-gray-600">Messages</span>
          </div>
        </div>
      </div>
    </section>
  );
}
