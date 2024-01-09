"use client";

import React from "react";
import { useEffect, useState } from 'react';

import PriceFilter from "./components/Filters/PriceFilter";
import SearchFilter from "./components/Filters/SearchFilter";
import AddPropertyButton from "./components/Property/AddPropertyButton";
import PropertiesList from "./components/Property/PropertiesList";
import SignupButton from "./components/Authorization/SignupButton";

import "../styles/style.css";


import AddPropertyModal from "./components/Property/AddPropertyModal";
import SignupModal from "./components/Authorization/SignupModal";
import LoginModal from "./components/Authorization/LoginModal";
import LoginButton from "./components/Authorization/LoginButton";
import LogoutButton from "./components/Authorization/LogoutButton";

import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./components/Map/Map'), {
  ssr: false, // Ensure this component doesn't render on the server
});
import CountrySelectButton from "./components/Map/CountrySelectButton";
import CountrySelectModal from "./components/Map/CountrySelectModal";
import MyListingsButton from "./components/Listings/MyListingsButton";
import MyBookingsButton from "./components/Listings/MyBookingsButton";

// import fetch from ''


export default function HomePage() {
  const [searchTermFilter, setSearchTermFilter] = useState(undefined);
  const [minPriceFilter, setMinPriceFilter] = useState(undefined);
  const [maxPriceFilter, setMaxPriceFilter] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState(''); //for going to that specific user's page for bookings/listings
  const [errorMsg, setErrorMsg] = useState('');
  const [center, setMapCenter] = useState([51.505, -0.09]);
  const [mapKey, setMapKey] = useState(0); // Use key prop

  const handleMapCenterChange = (newCenter) => {
    setMapCenter(newCenter);
    setMapKey((prevKey) => prevKey + 1); // Update key to force re-render
  };



  useEffect(() => {
    async function fetchData() {
      try {
        // Check user authentication status
        const authRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth`, {
          credentials: 'include',
        });
        const authData = await authRes.json();

        setIsLoggedIn(authData.isLoggedIn);

        setIsLoading(false);
        
        if (authData.isLoggedIn) {
          // Fetch username if user is logged in
          const usernameRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username`, {
            credentials: 'include',
          });
          const usernameData = await usernameRes.json();
          setUsername(usernameData.username);
          setUserID(usernameData.id);
          
          
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    


  }, []);

  if (isLoading) return <></>

  const updateCenter = (newCenter) => {
    setMapCenter(newCenter);
  };

  return (
    <>
      <nav>
        <div>StayVenture</div>
        <div className="price-filter-container">
          <PriceFilter
            setMinPriceFilter={setMinPriceFilter}
            setMaxPriceFilter={setMaxPriceFilter}
          />
        </div>
        <div className="nav-container">
          <div className="search-container">
            <SearchFilter setSearchTermFilter={setSearchTermFilter} />
          </div>
          {
            isLoggedIn ? (
              <>
              <AddPropertyButton/>
              <MyListingsButton />
              <MyBookingsButton />
              <LogoutButton/>
            </>
            ) : (
            <>
            <SignupButton />
            <LoginButton />
            <CountrySelectButton/>
            </>   
            )
          }
        </div>
      </nav>
      
      <div className="flex-container">
        <div className="top" id="properties-container">
          <PropertiesList
            searchQuery={searchTermFilter}
            minPrice={minPriceFilter}
            maxPrice={maxPriceFilter}
          />
        </div>
        <div className="map">
          <Map 
              key={mapKey}
              searchQuery={searchTermFilter}
              minPrice={minPriceFilter}
              maxPrice={maxPriceFilter}
              center={center}
          />
        </div>
      </div>

      <div id="myCountrySelect" className="modal">
        <CountrySelectModal setMapCenter={handleMapCenterChange} />
      </div>
      <div id="myModal" className="modal">
        <AddPropertyModal />
      </div>
      <div id="mySignupModal" className="modal">
        <SignupModal />
      </div>
      <div id="myLoginModal" className="modal">
        <LoginModal />
      </div>
      

    </>
  );
}
