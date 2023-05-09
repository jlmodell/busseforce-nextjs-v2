"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";

import clsx from "clsx";

import { type BusseUser } from "@/app/api/auth/[...nextauth]/route";
import NavigationLinks from "./navigationLinks";

const userNavigation = [
  { name: "Add Action", href: "/actions/add" },
  { name: "Add Contact", href: "/contacts/add" },
  { name: "Add Opportunity", href: "/opportunities/add" },
  { name: "Sign out", href: "/auth/signOut" },
];

export default function Header() {
  const { data: session } = useSession();

  return (
    <Popover
      as="header"
      className="pb-24 bg-gradient-to-r from-sky-700 to-indigo-600"
    >
      {({ open }) => (
        <>
          <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
              <>
                {/* Logo */}
                <div className="absolute left-0 py-5 flex-shrink-0 lg:static text-3xl md:text-xl text-[#A5F3FC] hover:text-white">
                  <Link href="/">
                    <span className="sr-only">busse crm - busseforce</span>
                    <span className="hidden font-light tracking-tighter md:inline-block">
                      busse
                    </span>
                    <span className="hidden italic font-semibold md:inline-block">
                      force
                    </span>
                    <span className="font-light tracking-tighter md:hidden">
                      b
                    </span>
                    <span className="italic font-semibold md:hidden">f</span>
                  </Link>
                </div>

                {/* Right section on desktop */}
                <div
                  className={clsx(
                    !session && "invisible",
                    "hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5"
                  )}
                >
                  <button
                    type="button"
                    className="flex-shrink-0 p-1 text-blue-200 rounded-full hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                  <Menu as="div" className="relative flex-shrink-0 ml-4">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex text-sm bg-white rounded-full ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                            <span className="sr-only">Open user menu</span>
                            {session && (
                              <img
                                className="w-8 h-8 rounded-full"
                                src={(session?.user as BusseUser)?.Image}
                                alt=""
                              />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute z-40 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg -right-2 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => {
                              if (item.name === "Sign out") {
                                return (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <button
                                        onClick={async () => await signOut()}
                                        className={clsx(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                        )}
                                      >
                                        {item.name}
                                      </button>
                                    )}
                                  </Menu.Item>
                                );
                              }
                              return (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={clsx(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </>
              <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                <div
                  className={clsx(
                    "lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center"
                  )}
                >
                  {/* Left nav */}
                  <div className="hidden lg:block lg:col-span-2"></div>
                  <div className="px-12 lg:px-0">
                    {/* Search */}
                    <div className="w-full max-w-xs mx-auto lg:max-w-md">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <SearchIcon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <input
                          // value={search}
                          // onChange={({ target }) => {
                          //   setSearch(target.value);
                          // }}
                          // onBlur={({ target }) => {
                          //   setSearch(target.value);
                          // }}
                          id="search"
                          className="block w-full py-2 pl-10 pr-3 leading-5 text-white placeholder-white bg-white border border-transparent rounded-md bg-opacity-20 focus:text-gray-900 focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu button */}
              <div
                className={clsx(
                  !session && "invisible",
                  "absolute right-0 flex-shrink-0 lg:hidden"
                )}
              >
                {/* Mobile menu button */}
                <Popover.Button className="inline-flex items-center justify-center p-2 bg-transparent rounded-md text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          <Transition.Root show={open} as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay
                  static
                  className="fixed inset-0 z-20 bg-black bg-opacity-25"
                />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute inset-x-0 top-0 z-30 w-full max-w-3xl p-2 mx-auto transition origin-top transform"
                >
                  <div className="bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div className="text-2xl text-gray-900">
                          <span className="font-light tracking-tighter">
                            busse
                          </span>
                          <span className="italic font-semibold">force</span>
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 mt-3 space-y-1">
                        <NavigationLinks />
                      </div>
                    </div>
                    <div className="pt-4 pb-2">
                      <div
                        className={clsx(
                          !session && "invisible",
                          "flex items-center px-5"
                        )}
                      >
                        <div className="flex-shrink-0">
                          {session && (
                            <img
                              className="w-10 h-10 rounded-full"
                              src={(session?.user as BusseUser)?.Image}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
                          <div className="text-base font-medium text-gray-800 truncate">
                            {(session?.user as BusseUser)?.FirstName}{" "}
                            {(session?.user as BusseUser)?.LastName}
                          </div>
                          <div className="text-sm font-medium text-gray-500 truncate">
                            {(session?.user as BusseUser)?.Email}
                          </div>
                        </div>
                        <button className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600">
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="px-2 mt-3 space-y-1">
                        {session &&
                          userNavigation.map((item) => {
                            if (item.name === "Sign out") {
                              return (
                                <button
                                  key={item.name}
                                  onClick={() => signOut()}
                                  className="block w-full px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
                                >
                                  {item.name}
                                </button>
                              );
                            }
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}
