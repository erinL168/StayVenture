import React from "react";

function handleClick() {
  document.querySelector("#mySignupModal").style.display = "block";
}

export default function SignupButton() {
  return (
    <button id="modal-btn" onClick={handleClick}>
      Sign Up
    </button>
  );
}
