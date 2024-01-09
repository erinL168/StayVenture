"use client";

import React from "react";

export default function PropertyDescription({ property }) {
  return (
    <div className="property-description">
      <p className="price">{"$" + property.price + "/per night"}</p>
      <p className="address">{property.address}</p>
      <div>
        <p className="desc">{property.description}</p>
      </div>
    </div>
  );
}
