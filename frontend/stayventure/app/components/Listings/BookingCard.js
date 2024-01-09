import React from "react";
import Image from "next/image"

import "../../../styles/property.css";
import "../../../styles/globals.css"

export default function BookingCard({ startDate, endDate, totalCost, _id, address, city, country, description, image, title }) {
  return (
    <div className='flex items-center border'>
    <a href={`/properties/${_id}`} className='w-full'>
        <div className='flex pb-10 py-7 px-2 hover:opacity-80 hover:shadow-lg'>
            <div className="relative h-60 w-96 flex-shrink-0">
                <Image src={image} fill alt={description} sizes="100vw, 100vw" priority={true}/>
            </div>

            <div className='flex flex-col flex-grow pl-5'>
                <h4 className='text-xl'>{title}</h4>
                <p>{`${address}, ${city}, ${country}`}</p>

                <div className='border-b w-20 pt-2 border-gray-800'></div>

                <p className='pt-2 text-sm text-gray-500 flex-grow'>{description}</p>
                <p className="text-lg font-semibold">Booking From: {(new Date(startDate)).toDateString()} to {(new Date(endDate)).toDateString()}</p>
                <p className="text-lg font-semibold">Total Cost: ${totalCost}</p>
            </div>
        </div>        
    </a>
  </div>
  );
  }
