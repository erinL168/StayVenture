"use client";

import React from "react";

import { useState, useEffect } from "react";

import CommentsForm from "../../components/Property/CommentsForm";

export default function CommentSection({ loadComments, property }) {
  const [comments, setComments] = useState(loadComments);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const authRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth`, {
        credentials: 'include',
      });
      const authData = await authRes.json();

      setIsLoggedIn(authData.isLoggedIn);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="comments-section border-t border-black font-bold text-2xl">
        <h3>Comments</h3>
        <div id="comments-container">
            {(comments.length === 0) ? 'No comments'  :
          comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <p className="comments-username">{comment.username}</p>
              <p className="comments-rating">⭐️ {comment.rating}</p>
              <p className="comments-message">{comment.message}</p>
            </div>
          ))}
        </div>
      </div>
      {isLoggedIn && <CommentsForm property={property} setComments={setComments} />}
    </>
  );
}
