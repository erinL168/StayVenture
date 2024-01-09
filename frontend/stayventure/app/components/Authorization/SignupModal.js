import React from "react";
import { useState } from 'react';


function handleClick() {
  document.querySelector("#mySignupModal").style.display = "none";


}

export default function SignupModal() {
  const [errorMsg, setErrorMsg] = useState('');
  async function handleSignup(event) {
    

    event.preventDefault();
  
    const formData = new FormData(event.target);
    const jsonData = {};
  
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
    console.log(jsonData);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        setErrorMsg(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }



// export default function SignupModal() {
//   const [errorMsg, setErrorMsg] = useState('');

//   async function handleSignup(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const jsonData = {};

//     for (const [key, value] of formData.entries()) {
//       jsonData[key] = value;
//     }

//     const urlEncodedData = Object.keys(jsonData)
//       .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(jsonData[key]))
//       .join('&');

//     try {
//       const response = await fetch('http://localhost:3001/user/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: urlEncodedData,
//         credentials: `include`
//       });

//       if (!response.ok) {
//         const responseData = await response.json();
//         setErrorMsg(responseData.message);
//       }
//     } catch (error) {
//       // console.error('Error:', error);
//     }
//   }
  const action = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`

  return (
    <div className="modal-content">
      <span className="close" onClick={handleClick}>
        &times;
      </span>
      <h3>Sign Up</h3>
      <form
        id="signup"
        action= {action}
        method="post"
        encType="application/x-www-form-urlencoded"
        // onSubmit={handleSignup}
      >
         <h4>{errorMsg}</h4>
        <div className="property-item">
          <div className="property-detail">
            <span>Username:</span>
            <input type="text" name="username" required />
          </div>
          <div className="property-detail">
            <span>First Name:</span>
            <input type="text" name="fname" required />
          </div>
          <div className="property-detail">
            <span>Last Name:</span>
            <input type="text" name="lname" required />
          </div>
          <div className="property-detail">
            <span>Email:</span>
            <input type="email" name="email" required />
          </div>
          <div className="property-detail">
            <span>Password:</span>
            <input type="password" name="password" required />
          </div>
        </div>

        <button type="submit" id="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
