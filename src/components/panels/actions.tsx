import {
  CashIcon,
  PhoneIcon,
  NewspaperIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";

export default function ActionsPanel() {
  const actions = [
    {
      icon: NewspaperIcon,
      name: "Announcements",
      href: "/announcements",
      iconForeground: "text-yellow-700",
      iconBackground: "bg-yellow-50",
      summary: "Latest announcements from Busse Hospital Disposables",
    },
    {
      icon: CashIcon,
      name: "Opportunities",
      href: "/opportunities",
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
      summary: "Current and Past Opportunities",
    },
    {
      icon: UsersIcon,
      name: "Actions",
      href: "/actions",
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
      summary: "Current and Past Actions and Follow Ups",
    },
    {
      icon: UsersIcon,
      name: "Add an Action",
      href: "/actions/add",
      iconForeground: "text-pink-700",
      iconBackground: "bg-pink-50",
      summary: "Add a new Action form",
    },
    {
      icon: PhoneIcon,
      name: "Contacts",
      href: "/contacts",
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      summary: "Current and Past Contacts",
    },
    {
      icon: PhoneIcon,
      name: "Add a Contact",
      href: "/contacts/add",
      iconForeground: "text-red-700",
      iconBackground: "bg-red-50",
      summary: "Add a new Contact form",
    },
  ];
  return (
    <section aria-labelledby="quick-links-title">
      <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
        <h2 className="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {actions.map((action, actionIdx) => (
          <div
            key={action.name}
            className={clsx(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600"
            )}
          >
            <div>
              <span
                className={clsx(
                  action.iconBackground,
                  action.iconForeground,
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.name}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.summary}</p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
