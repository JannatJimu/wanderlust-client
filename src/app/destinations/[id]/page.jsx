import React from "react";
import Link from "next/link";
import { EditModal } from "@/component/EditModal";
import { DeleteAlert } from "@/component/DeleteAlert";
import BookingCard from "@/component/BookingCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers()
  })

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("API is returning HTML instead of JSON. Check NEXT_PUBLIC_SERVER_URL.");
  }

  const destination = await res.json();
  if (!destination || !destination._id) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Destination Not Found
        </h2>
      </div>
    );
  }

  const {
    _id,
    destinationName,
    imageUrl,
    category,
    country,
    description,
    duration,
    price,
    departureDate,
  } = destination;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 font-medium text-gray-600 transition hover:text-blue-600"
          >
            <span className="text-xl">←</span>
            Back to Destinations
          </Link>

          {/* Pass destination data to EditModal */}
          <div className="flex flex-wrap items-center gap-3">
            <EditModal destination={destination} />
            <DeleteAlert destination={destination} />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60">
          <div className="relative h-72 sm:h-96 lg:h-[480px]">
            <img
              src={imageUrl}
              alt={destinationName}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
              <span className="rounded-full border border-white/30 bg-white/90 px-4 py-2 text-sm font-semibold text-blue-700 shadow-lg">
                {category}
              </span>
            </div>

            <div className="absolute bottom-6 left-5 right-5 text-white sm:bottom-10 sm:left-10">
              <p className="mb-2 text-sm font-medium sm:text-base">
                📍 {country}
              </p>

              <h1 className="text-3xl font-extrabold sm:text-5xl lg:text-6xl">
                {destinationName}
              </h1>

              <p className="mt-3 text-sm text-white/85 sm:text-base">
                Discover new places, beautiful views, and unforgettable
                experiences.
              </p>
            </div>
          </div>

          <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_320px] lg:p-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                About This Destination
              </h2>

              <p className="mt-4 text-base leading-8 text-gray-600">
                {description}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm text-gray-500">Destination</p>
                  <h3 className="mt-2 font-bold text-gray-900">
                    {destinationName}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm text-gray-500">Trip Duration</p>
                  <h3 className="mt-2 font-bold text-gray-900">
                    {duration}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm text-gray-500">Travel Category</p>
                  <h3 className="mt-2 font-bold text-gray-900">
                    {category}
                  </h3>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                <h3 className="font-bold text-blue-900">
                  ✨ Make Your Next Journey Special
                </h3>

                <p className="mt-2 text-sm leading-7 text-blue-800/80">
                  Get ready to explore {destinationName} and create memories
                  that last a lifetime.
                </p>
              </div>
            </div>

            <BookingCard destination={destination}></BookingCard>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-blue-600 p-6 text-center text-white sm:flex-row sm:p-8 sm:text-left">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Ready for your next adventure?
            </h2>

            <p className="mt-2 text-sm text-blue-100">
              Explore more amazing destinations with Wanderlust.
            </p>
          </div>

          <Link
            href="/destinations"
            className="shrink-0 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Explore More
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
