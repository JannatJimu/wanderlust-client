"use client";

import { FaTrashAlt } from "react-icons/fa";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export function DeleteAlert({ destination }) {
  const { _id, destinationName } = destination;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Delete failed with status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Delete result:", result);

      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete destination. Check your backend server and CORS settings.");
    }
  };

  return (
    <AlertDialog>
      <Button
        className="gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700 active:scale-95"
        variant="outline"
      >
        <FaTrashAlt className="text-sm" />
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{destinationName}</strong> and all of its data.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                className="rounded-lg px-4"
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
                className="gap-2 rounded-lg px-5 font-semibold shadow-sm transition-all hover:shadow-md"
              >
                <FaTrashAlt className="text-sm" />
                Delete Permanently
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
