import React from "react";

import "../../../styles/property.css";
import { notFound } from 'next/navigation'
import PropertyInfo from "../../components/Property/PropertyInfo";
import PropertyDescription from "../../components/Property/PropertyDescription";
import CommentSection from "../../components/Property/CommentSection";
import BookingPicker from "@/app/components/Property/BookingPicker";

export async function generateMetadata({ params }) {
  const propertyRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${params.propertyId}`, { next: { revalidate: 0 } }
  );

  if (propertyRes.status != 200) {
    return
  }

  const property = await propertyRes.json();

  return {
    title: property.title,
  };
}

export default async function PropertyPage({ params }) {
  const propertyRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${params.propertyId}`, { next: { revalidate: 0 } }
  );

  if (propertyRes.status != 200) {
    return notFound()
  }

  const property = await propertyRes.json();

  const commentsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${params.propertyId}/comments`,
    { next: { revalidate: 0 } }
  );
  let comments = await commentsRes.json();

  comments = comments.comments;

  return (
    <>
      <nav>
        <a href={process.env.NEXT_PUBLIC_FRONTEND_URL}>StayVenture</a>
      </nav>
      <div className="container">
        <div className="property-details">
          <PropertyInfo property={property} />
          <PropertyDescription property={property} />
          <BookingPicker id={property._id} price={property.price} />
          <CommentSection loadComments={comments} property={property} />
        </div>
      </div>
    </>
  );
}
