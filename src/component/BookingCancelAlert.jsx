"use client";

import { authClient } from "@/lib/auth-client";
import { FaTrashAlt } from "react-icons/fa";
import { AlertDialog, Button } from "@heroui/react";

export function BookingCancelAlert({ bookingId }) {
  const handleCancelBooking = async () => {

    const {data :tokenData}=await authClient.token()
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization:`Bearer ${tokenData?.token}`
      },
    });

    const data = await res.json();

    window.location.reload();
  };

  return (
    <AlertDialog>
      <Button
        className="rounded-lg border border-red-200 bg-white px-4 py-2 font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700"
        variant="outline"
      >
        <FaTrashAlt className="text-sm" />
        Cancel Booking
      </Button>

      <AlertDialog.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header className="flex flex-col items-center gap-3 px-6 pt-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <FaTrashAlt className="text-2xl text-red-600" />
              </div>

              <AlertDialog.Heading className="text-xl font-bold text-gray-900">
                Cancel This Booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="px-6 pb-6 pt-3 text-center">
              <p className="text-sm leading-6 text-gray-600">
                Are you sure you want to cancel this booking? This action will
                permanently remove your booking from your list.
              </p>

              <div className="mt-4 rounded-lg border border-red-100 bg-red-50 p-3 text-left">
                <p className="text-sm font-medium text-red-700">
                  <span className="mr-2">⚠</span>
                  This action cannot be undone.
                </p>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
              <Button
                slot="close"
                variant="tertiary"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Keep Booking
              </Button>

              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
                className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                <FaTrashAlt className="text-xs" />
                Confirm Cancel
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
