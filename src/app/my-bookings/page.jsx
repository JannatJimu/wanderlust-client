import { auth } from "@/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";
import { BookingCancelAlert } from "@/component/BookingCancelAlert";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { token } = await auth.api.getToken({
    headers: await headers()
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="py-20 text-center text-slate-600">
        Please log in to view your bookings.
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );


  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  const bookings = await res.json();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Your Travel Journal
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 text-slate-500">
            All your upcoming adventures, organized in one place.
          </p>
        </div>

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <h2 className="text-xl font-bold text-slate-800">
                No bookings found
              </h2>
              <p className="mt-2 text-slate-500">
                Your travel adventures will appear here.
              </p>
              <div className="mt-4">
                <Link
                  href="/destinations"
                  className="shrink-0 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Explore Amazing Destinations
                </Link>
              </div>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex"
              >
                <div className="relative h-60 w-full shrink-0 overflow-hidden sm:h-auto sm:w-72 lg:w-80">
                  <Image
                    src={booking.imageUrl}
                    alt={booking.destinationName}
                    height={200}
                    width={200}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                    ✈ Your Trip
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-7 lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                      Destination
                    </p>

                    <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                      {booking.destinationName}
                    </h2>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <div className="rounded-xl bg-slate-50 px-4 py-3">
                        <p className="text-xs font-medium text-slate-500">
                          Departure Date
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {new Date(
                            booking.departureDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-xs font-medium text-slate-500">
                        Booking Reference
                      </p>

                      <p className="mt-1 break-all font-mono text-sm text-slate-700">
                        {booking._id}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:gap-8 lg:min-w-40 lg:flex-col lg:items-end lg:justify-center lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                    <div>
                      <p className="text-sm text-slate-500">
                        Total Price
                      </p>

                      <p className="mt-1 text-3xl font-extrabold text-blue-600">
                        ${booking.price}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Per person
                      </p>

                      <div className="mt-3 inline-block rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        ✓ Booked
                      </div>
                    </div>

                    <BookingCancelAlert bookingId={booking._id} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingPage;