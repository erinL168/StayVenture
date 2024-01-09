import React from "react";
import Image from "next/image"

import "../../../styles/property.css";
import "../../../styles/globals.css"

export default function ListingCard({ handleDelete, _id, address, city, country, description, image, price, title }) {
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
                <p className="text-lg font-semibold">${price}/night</p>
            </div>
        </div>        
    </a>

    <form
    id={`${_id}-delete-form`}
    action={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${_id}`}
    method="POST"
    className='p-8'
    >
    <input type="hidden" name="_method" value="DELETE" />
    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none
      hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 
      font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
      dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
        dark:focus:ring-gray-700" id={`${_id}-delete-btn`} type="button" onClick={() => handleDelete()}>
        Delete Listing
    </button>
    </form>    

  </div>
  );
  }
