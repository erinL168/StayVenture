'use client'

import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

import "../../styles/property.css";
import "../../styles/globals.css"
import ListingCard from "../components/Listings/ListingCard";

export default function MyListings() {
  const [listings, setListings] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  function handleDelete(_id) {
    const deleteForm = document.getElementById(`${_id}-delete-form`);
    fetch(deleteForm.action, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((response) => {
      if (response.status === 200) {
        let new_listings = listings.filter((listings) => listings._id !== _id);
        setListings(new_listings);
      } else {
        console.error("Error deleting property.");
      }
    });
  }

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/my_listings`, { next: { revalidate: 0 }, credentials: 'include' }
        );
      
        if(listingsRes.status != 200) {
          router.push('/');
        }

        const data = await listingsRes.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchListings();
  }, []);

  if (isLoading) return <></>;

  return (
    <>
      <nav>
        <a href={process.env.NEXT_PUBLIC_FRONTEND_URL}>StayVenture</a>
      </nav>
      <h1 className="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">My Listings</h1>
      
      {(listings.length == 0) && <p>No Listings</p> ||
      <div className="flex flex-col">
        {listings.map(({ _id, address, city, country, description, price, title }) => 
          <ListingCard key={_id} handleDelete={() => handleDelete(_id)} _id={_id} address={address} city={city} country={country} description={description} 
          image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${_id}/picture/0`} price={price} title={title} />
        )}
      </div>}
    </>
  );
  }
