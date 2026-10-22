"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        {/* Logo */}
        <Link
          href={"/"}
          className="flex shrink-0 items-center gap-2 transition-transform duration-200 hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m16.2 7.8-2.8 5.6-5.6 2.8 2.8-5.6 5.6-2.8Z" />
              <path d="M12 3v2M21 12h-2M12 21v-2M3 12h2" />
            </svg>
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            Wander<span className="text-emerald-600">lust</span>
          </span>
        </Link>

        {/* Main Navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          <li>
            <Link
              href={"/"}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/destinations"}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              href={"/my-bookings"}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              href={"/add-destination"}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Add Destination
            </Link>
          </li>
        </ul>

        {/* User Actions */}
        <ul className="flex shrink-0 items-center gap-2 sm:gap-3">
          <li>
            <Link
              href={"/profile"}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:inline-flex"
            >
              Profile
            </Link>
          </li>

          {user ? (
            <>
              <li className="flex items-center">
                <Avatar className="h-9 w-9 rounded-full ring-2 ring-emerald-100 ring-offset-2">
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt="John Doe"
                    src={user?.image}
                  />
                  <Avatar.Fallback>
                    {user.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
              </li>
              <li>
                <Button
                  size="sm"
                  onClick={handleSignOut}
                  variant="danger"
                  className="rounded-full bg-red-50 px-4 font-semibold text-red-600 transition-all duration-200 hover:bg-red-100"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={"/login"}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 sm:px-4"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href={"/signup"}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md sm:px-5"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="border-t border-gray-100 bg-gray-50/80 px-3 py-2 lg:hidden">
        <ul className="mx-auto flex max-w-7xl items-center justify-start gap-2 overflow-x-auto whitespace-nowrap">
          <li>
            <Link
              href={"/"}
              className="inline-flex rounded-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/destinations"}
              className="inline-flex rounded-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              href={"/my-bookings"}
              className="inline-flex rounded-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
            >
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              href={"/add-destination"}
              className="inline-flex rounded-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
            >
              Add Destination
            </Link>
          </li>
          <li>
            <Link
              href={"/profile"}
              className="inline-flex rounded-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;