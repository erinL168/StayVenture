import React from "react";

function handleClick() {
  document.querySelector("#myModal").style.display = "none";
}

export default function AddPropertyModal() {
  const action = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addProperty`

  return (
    <div className="modal-content">
      <span className="close" onClick={handleClick}>
        &times;
      </span>
      <h3>Post your property</h3>
      <form
        id="post-property"
        action={action}
        method="post"
        encType="multipart/form-data"
      >
        <div className="property-item">
          <div className="property-detail">
            <span>Title:</span>
            <input type="text" name="title" required />
          </div>
        </div>

        <div className="property-item">
          <div className="property-detail">
            <span>Country:</span>
            <input type="text" name="country" required />
          </div>
          <div className="property-detail">
            <label>Province or State:</label>
            <input type="text" name="prov_state" required />
          </div>
        </div>

        <div className="property-item">
          <div className="property-detail">
            <label>City:</label>
            <input type="text" name="city" required />
          </div>
          <div className="property-detail">
            <label>Address:</label>
            <input type="text" name="address" required />
          </div>
        </div>

        <div className="property-item">
          <div className="property-detail">
            <label>Price/per night:</label>
            <input type="number" name="price" required />
          </div>
          <div className="property-detail">
            <label>Postal Code:</label>
            <input type="text" name="postCode" required />
          </div>
        </div>

        <div className="property-item  property-image">
          <div className="property-detail">
            <label htmlFor="image-file">Upload Images:</label>
            <input
              type="file"
              id="image-file"
              accept="image/*"
              multiple
              name="property-images"
              required
            ></input>
          </div>
        </div>

        <div className="property-item">
          <div className="property-detail">
            <label>Description:</label>
            <textarea type="text" name="desc"></textarea>
          </div>
        </div>

        <button type="submit" id="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
