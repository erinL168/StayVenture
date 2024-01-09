"use client";

import React from "react";
import { useState, useEffect } from "react";

export default function PropertiesList({ searchQuery, minPrice, maxPrice }) {
  const [properties, setProperties] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties`, {
        next: { revalidate: 0 },
      });
      const data = await res.json();
      setProperties(data);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (properties.length == 0) return <p>No Listings</p>;

  const search = searchQuery || "";
  const minimumPrice = minPrice || 0;
  const maximumPrice = maxPrice || Infinity;

  return (
    <>
      {properties
        .filter(
          (property) =>
            (property.country.toLowerCase().startsWith(search.toLowerCase()) ||
              property.city.toLowerCase().startsWith(search.toLowerCase()) ||
              property.prov_state.toLowerCase()
                .startsWith(search.toLowerCase())) &&
            property.price >= minimumPrice &&
            property.price <= maximumPrice
        )
        .map((filteredProperty) => (
          <div className="property-card" key={filteredProperty._id}>
            <a href={`/properties/${filteredProperty._id}`} target="_blank">
              <div>
                <div className="property-details">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${filteredProperty._id}/picture/0`}
                    alt={filteredProperty.title}
                  ></img>
                  <h4>{filteredProperty.title}</h4>
                  <p>
                    {filteredProperty.city}, {filteredProperty.prov_state},{" "}
                    {filteredProperty.country}
                  </p>
                  <p>${filteredProperty.price}</p>
                  <p>⭐️ {filteredProperty.averageRating}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
    </>
  );
}
