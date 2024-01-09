import { useRouter } from "next/navigation"
import React from "react";

export default function MyBookingsButton() {
  const router = useRouter();

  return (
    <button id="modal-btn" onClick={() => {router.push("/my_bookings")}}>
      My Bookings
    </button>
  );
}
