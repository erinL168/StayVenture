import React from "react";

export default function SearchFilter({ setSearchTermFilter }) {
  return (
    <>
      <input
        type="text"
        id="search-input"
        placeholder="Search by Country, City or Province"
        onChange={() => {
          setSearchTermFilter(document.querySelector("#search-input").value);
        }}
      ></input>
    </>
  );
}
