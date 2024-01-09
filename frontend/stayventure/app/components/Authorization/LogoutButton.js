import React from "react";

function handleClick() {
  window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`;
}

export default function LogoutButton() {
  return (
    <button id="modal-btn" onClick={handleClick}>
      Log Out
    </button>
  );
}
