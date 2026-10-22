"use client";

import React, { useState } from "react";
import { Button, Card, DateField, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);

  const {
    _id,
    destinationName,
    imageUrl,
    country,
    price,
    duration,

  } = destination;

  const handleBooking = async() => {
    if (!user) {
      toast.error("Please log in to book this trip.");
      return;
    }

    if (!departureDate) {
      toast.error("Please select a departure date.");
      return;
    }

    const bookingData = {
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      destinationId: _id,
      destinationName,
      imageUrl,
      country,
      price,
      departureDate: departureDate.toString(),
    };
    const {data :tokenData}=await authClient.token()
    // console.log(tokenData)

    // console.log("Booking Information:", bookingData);
    const res = await fetch( `${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,{
        method:'POST',
        headers:{
           'Content-type':'application/json',
           authorization:`Bearer ${tokenData?.token}`
        },
        body:JSON.stringify(bookingData)
    })
    const data=await res.json();
    toast.success("Booking confirmed! Get ready for your next adventure.");
  };

  return (
    <Card className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
      <p className="text-sm font-medium text-gray-500">
        Starting from
      </p>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold text-blue-600">
          ${price}
        </span>

        <span className="text-sm text-gray-500">/ person</span>
      </div>

      <div className="my-6 border-t border-slate-100" />

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">📅</span>

          <div className="w-full">
            <p className="text-sm text-gray-500">
              Departure Date
            </p>

            <div className="mt-2">
              <DateField
                onChange={setDepartureDate}
                className="w-full"
                name="date"
              >
                <Label>Select Date</Label>

                <DateField.Group>
                  <DateField.Input>
                    {(segment) => (
                      <DateField.Segment segment={segment} />
                    )}
                  </DateField.Input>
                </DateField.Group>
              </DateField>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl">⏱️</span>

          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="mt-1 font-semibold text-gray-900">
              {duration}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl">🌍</span>

          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="mt-1 font-semibold text-gray-900">
              {country}
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleBooking}
        className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg transition hover:bg-blue-700"
      >
        Book This Trip →
      </Button>

      <p className="mt-4 text-center text-xs leading-5 text-gray-500">
        Plan your next adventure with Wanderlust.
      </p>
    </Card>
  );
};

export default BookingCard;