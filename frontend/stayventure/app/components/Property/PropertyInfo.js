'use client'

import React from "react";
import { useState } from "react";

export default function PropertyInfo({ property }) {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div className="property-info">
      <div className="property-title">
        {`${property.title} in ${property.city}, ${property.prov_state}, ${property.country}`}
      </div>

      {(imgIdx > 0) && <div id="prev-arrow" className="arrow" onClick={() => setImgIdx(imgIdx - 1)}>
        ←
      </div>}

      <div className="image-container">
        <img
          id="property-image"
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${property._id}/picture/${imgIdx}`}
          alt="Property Image"
          className="property-images"
        />
      </div>

      {(imgIdx < property.images.length - 1) && <div id="next-arrow" className="arrow" onClick={() => setImgIdx(imgIdx + 1)}>
        →
      </div>}
    </div>
  );
}
