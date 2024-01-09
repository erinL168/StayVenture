"use client";

import React from "react";
import { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { differenceInDays } from 'date-fns'
import { useRouter } from "next/navigation";

import '../../../styles/globals.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function BookingPicker({ id, price }) {
  const [bookingClicked, setBookingClicked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const selectionRange = { startDate: startDate, endDate: endDate, key: "selection" }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingPrice, setPrice] = useState(0);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
    setPrice((differenceInDays(ranges.selection.endDate, ranges.selection.startDate) + 1) * price)
  }

  const handleBooking = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/book`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startDate, endDate, property: id, totalCost: bookingPrice }),
    })
    router.push('/my_bookings');
  }

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

  return (<>
    {isLoggedIn && 
    <div className='mt-3 flex flex-col'>
        <button onClick={() => {setBookingClicked(!bookingClicked)}} className="text-gray-900 bg-white border border-gray-300 focus:outline-none
        hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 
        font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
        dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
          dark:focus:ring-gray-700 self-center" >{(bookingClicked) ? 'Close Booking' : 'Select Booking'}</button>
        {bookingClicked && 
          <div className='self-center mt-3'>
            <DateRangePicker ranges={[selectionRange]} minDate={new Date()}  onChange={handleSelect} />
          </div>}
        {bookingClicked &&
          <div className='self-center mb-4 font-bold text-2xl'>
            {`Total: $${bookingPrice}`}
          </div>}
        {bookingClicked &&
          <div className='self-center m-1'>
            <button onClick={() => {handleBooking(id)}} className="text-gray-900 bg-white border border-gray-300 focus:outline-none
        hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 
        font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
        dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
          dark:focus:ring-gray-700">Book</button>
          </div>}
    </div>}
    </>
  );
}
