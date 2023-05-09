"use client";

import { signIn } from "next-auth/react";
import clsx from "clsx";

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-0 lg:py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-3 lg:mt-6 text-center text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">
          Sign in to{" "}
          <span className="tracking-tighter font-light underline text-gray-500">
            busse
          </span>
          <span className="font-semibold italic underline">force</span>
        </h2>
      </div>

      <div className="mt-3 lg:mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-medium"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  name="email"
                  className={clsx(
                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  className={clsx(
                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-gray-700 focus:ring-gray-200 border-gray-300 rounded"
                  name="rememberMe"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-xs lg:text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-xs lg:text-sm">
                <a
                  href={`mailto:jmodell@busseinc.com?subject=busseforce password change request&body=Please change my password to: `}
                  className="font-medium text-gray-700 hover:text-gray-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-100"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
