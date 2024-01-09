import React from "react";

function handleClick() {
  document.querySelector("#myLoginModal").style.display = "block";
}

export default function LoginButton() {
  return (
    <button id="modal-btn" onClick={handleClick}>
      Log In
    </button>
  );
}
