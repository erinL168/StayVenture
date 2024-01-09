import React from "react";

function handleClick() {
  document.querySelector("#myCountrySelect").style.display = "block";
}

export default function CountrySelectButton() {
  return (
    <button id="modal-btn" onClick={handleClick}>
      Select Destination
    </button>
  );
}
