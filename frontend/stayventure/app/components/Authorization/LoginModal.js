import React from "react";
import { useState } from 'react';


function handleClick() {
  document.querySelector("#myLoginModal").style.display = "none";
}

export default function LoginModal() {
  const [errorMsg, setErrorMsg] = useState('');
  async function handleLogin(event) {
    

    event.preventDefault();
  
    const formData = new FormData(event.target);
    const jsonData = {};
  
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
    console.log(jsonData);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
        credentials: 'include'
      });
  
      if (!response.ok) {
        // const responseData = await response.json();
        setErrorMsg("Invalid Credentials");
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

// export default function LoginModal() {
//   const [errorMsg, setErrorMsg] = useState('');
    
//   async function handleLogin(event) {
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
//       const response = await fetch('http://localhost:3001/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: urlEncodedData,
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         setErrorMsg("Invalid Credentials");
//       }

//     } catch (error) {
//       // console.error('Error:', error);
//     }
//   }

  const action = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`

  return (
    <div className="modal-content">
      <span className="close" onClick={handleClick}>
        &times;
      </span>
      <h3>Login</h3>
      <form
        id="login"
        // onSubmit={handleLogin}
        action={action}
        method="post"
        encType="application/x-www-form-urlencoded"
      >
        <h4>{errorMsg}</h4>
        <div className="property-item">
          <div className="property-detail">
            <span>Username:</span>
            <input type="text" name="username" required />
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
