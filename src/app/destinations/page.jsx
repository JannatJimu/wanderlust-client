import DestinationCard from "@/component/DestinationCard";
import React from "react";
import { LuCompass, LuMapPin } from "react-icons/lu";

// Render on every request instead of during `next build`
export const dynamic = "force-dynamic";

async function getDestinations() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!baseUrl) {
      console.error("NEXT_PUBLIC_SERVER_URL is not set");
      return [];
    }

    const res = await fetch(`${baseUrl}/destination`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Destination fetch failed with status:", res.status);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Expected JSON but received:", contentType);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Destination fetch error:", error);
    return [];
  }
}

const DestinationPage = async () => {
  const destinations = await getDestinations();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 px-5 py-16 text-white md:py-24">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <LuCompass size={17} />
            Discover Your Next Adventure
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Explore Amazing
            <span className="mt-2 block text-teal-200">Destinations</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-teal-50/90 md:text-lg">
            Discover beautiful places, create unforgettable memories, and find
            the perfect destination for your next journey.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-teal-100">
            <LuMapPin size={18} />
            <span>{destinations.length} destinations waiting for you</span>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              Find Your Escape
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              All Destinations
            </h2>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Explore our handpicked travel destinations.
            </p>
          </div>

          <span className="w-fit rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
            {destinations.length} Places
          </span>
        </div>

        {/* Destination Cards */}
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <LuCompass size={42} className="mx-auto mb-4 text-teal-600" />

            <h3 className="text-xl font-bold text-gray-800">
              No Destinations Yet
            </h3>

            <p className="mt-2 text-gray-500">
              New travel destinations will appear here soon.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default DestinationPage;