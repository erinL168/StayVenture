import React from "react";

export default function PriceFilter({ setMinPriceFilter, setMaxPriceFilter }) {
  return (
    <>
      <input
        type="number"
        id="min-price-input"
        placeholder="Min Price"
        min="0"
        onChange={() => {
          setMinPriceFilter(document.querySelector("#min-price-input").value);
        }}
      ></input>
      <input
        type="number"
        id="max-price-input"
        placeholder="Max Price"
        min="0"
        onChange={() => {
          setMaxPriceFilter(document.querySelector("#max-price-input").value);
        }}
      ></input>
    </>
  );
}
