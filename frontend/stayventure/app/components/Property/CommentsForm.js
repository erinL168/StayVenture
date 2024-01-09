"use client";

import React from "react";

function handleSubmitComment(event, property, setComments) {
  event.preventDefault();
  const propertyId = property._id;
  let username = '';
  const rating = document.getElementById("rating").value;
  const message = document.getElementById("message").value;
  document.getElementById("rating").value = "";
  document.getElementById("message").value = "";

  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username`, {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      username = data.username;

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${propertyId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, rating, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
        });
    });
}

export default function CommentsForm({ property, setComments }) {
  return (
    <div className="property-comments">
      <form id="comment-form">
        <div className="comment-item">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            required
          />
        </div>
        <div className="comment-item">
          <label htmlFor="message">Comment:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>

        <button
          type="submit"
          onClick={(event) => {
            handleSubmitComment(event, property, setComments);
          }}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none
      hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 
      font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
      dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
        dark:focus:ring-gray-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
