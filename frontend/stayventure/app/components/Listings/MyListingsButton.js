import { useRouter } from "next/navigation"
import React from "react";

export default function MyListingsButton() {
  const router = useRouter();

  return (
    <button id="modal-btn" onClick={() => {router.push("/my_listings")}}>
      My Listings
    </button>
  );
}
