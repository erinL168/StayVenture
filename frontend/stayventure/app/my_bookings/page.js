'use client'

import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

import "../../styles/property.css";
import "../../styles/globals.css"
import BookingCard from "../components/Listings/BookingCard";

export default function MyBookings() {
  const [bookings, setBookings] = useState(null)
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const bookingsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/my_bookings`, { next: { revalidate: 0 }, credentials: 'include' }
        );
      
        if(bookingsRes.status != 200) {
          router.push('/');
        }

        const data = await bookingsRes.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchBookings();
  }, []);

  if (isLoading) return <></>;

  return (
    <>
      <nav>
        <a href={process.env.NEXT_PUBLIC_FRONTEND_URL}>StayVenture</a>
      </nav>
      <h1 className="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">My Bookings</h1>
      
      {(bookings.length == 0) && <p>No Bookings</p> ||
      <div className="flex flex-col">
        {bookings.map(({ startDate, endDate, _id, address, city, country, description, totalCost, title }) => 
          <BookingCard key={_id} startDate={startDate} endDate={endDate} _id={_id} address={address} city={city} country={country} description={description} 
          image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${_id}/picture/0`} totalCost={totalCost} title={title} />
        )}
      </div>}
    </>
  );
  }
