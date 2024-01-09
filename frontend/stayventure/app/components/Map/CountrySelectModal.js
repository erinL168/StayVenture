// import React from "react";


// const handleButtonClick = (coordinates, setMapCenter) => {
//     // Use the provided function setMapCenter to update the map's center coordinates
//     document.querySelector("#myCountrySelect").style.display = "none";
//     setMapCenter(coordinates);
//   };

// export default function CountrySelectModal({setMapCenter}) {
//   return (
//     <div className="modal-content" id="country_select">
//       <span className="close" onClick={handleButtonClick}>
//         &times;
//       </span>
//       <h3>Select Country</h3>
//       <div>
//         <button onClick={() => handleButtonClick([51.505, -0.09], setMapCenter)}>I'm flexible</button>
//         <button onClick={() => handleButtonClick([48.8566, 2.3522], setMapCenter)}>Europe</button>
//         <button onClick={() => handleButtonClick([37.7749, -122.4194], setMapCenter)}>United States</button>
//         <button onClick={() => handleButtonClick([41.9028, 12.4964], setMapCenter)}>Italy</button>
//         <button onClick={() => handleButtonClick([21.4691, -78.6569], setMapCenter)}>Caribbean</button>
//         {/* Add other buttons and their corresponding coordinates */}
//       </div>
//     </div>
//   );
// }

import React from "react";

const CountrySelectModal = ({ setMapCenter }) => {
  const handleButtonClick = (coordinates, event) => {
    // event.preventDefault();
    document.querySelector("#myCountrySelect").style.display = "none";
    setMapCenter(coordinates);
    console.log(coordinates);
  };

  return (
    <div className="modal-content" id="country_select">
      <span className="close" onClick={() => handleButtonClick([0, 0], setMapCenter)}>
        &times;
      </span>
      <h3>Select by Region</h3>
      <div>
        <button onClick={(event) => handleButtonClick([51.505, -0.09], event)}>I&apos;m flexible</button>
        <button onClick={(event) => handleButtonClick([48.8566, 2.3522], event)}>Europe</button>
        <button onClick={(event) => handleButtonClick([37.7749, -122.4194], event)}>United States</button>
        <button onClick={(event) => handleButtonClick([41.9028, 12.4964], event)}>Italy</button>
        <button onClick={(event) => handleButtonClick([21.4691, -78.6569], event)}>Caribbean</button>
        <button onClick={(event) => handleButtonClick([15.7835, -90.2308], event)}>Central America</button>
        {/* Add other buttons and their corresponding coordinates */}
      </div>
    </div>
  );
};

export default CountrySelectModal;


