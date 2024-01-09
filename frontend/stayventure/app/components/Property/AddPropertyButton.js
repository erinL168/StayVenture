import React from "react";

function handleClick() {
  document.querySelector("#myModal").style.display = "block";
}

export default function SearchButton() {
  return (
    <button id="modal-btn" onClick={handleClick}>
      Add New Property
    </button>
  );
}
