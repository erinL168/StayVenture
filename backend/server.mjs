import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


import router from './route/user.mjs';
import listingsRouter from './route/listings.mjs'
import bookingsRouter from './route/bookings.mjs'
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
;

//brings in our Listing schema
import Listing from "./models/listing.mjs";
import Comment from "./models/review.js";
import User from './models/user.mjs';
import Booking from "./models/booking.mjs"

// import { propertiesDb } from './db/properties.mjs';

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/public/uploads"),
  filename: (req, file, callback) => {
    const extname = path.extname(file.originalname);
    const uniqueId = uuidv4();
    callback(null, uniqueId + extname);
  },
});

const upload = multer({ storage });

const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
      //secure: true
  }
}

//User
app.use(session(sessionConfig));
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser()); 

passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors({ preflightContinue: true }));
app.use(express.static("../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//middleware for user
app.use("/user", router);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
/*
To do for extra checking and general plan:

- create function validateObjectId to check if that id exists (ie. for deletion) 

- page for viewing all the properties owned by me
- history of which properties I've booked
- map of properties
- add pagination

*/
const isAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).end("access denied");
  next();
};


// app.get("/username", async (req, res) => {
//   //sign in and log in automatically
//   if (req.isAuthenticated()){
//     return req.user;
//   }
//   return res.status(401).json({message: "not signed in and can't access since"});
// });

app.use('/listings', listingsRouter);
app.use('/bookings', bookingsRouter);

app.post(
  "/addProperty", isAuthenticated,
  upload.array("property-images", 5),
  async (req, res) => {
    const formData = req.body;
    const images = req.files;
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.prov_state} ${formData.postCode}`;
    const apiKey = process.env.GM_API_KEY;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`;

    try {
      const response = await axios.get(geocodingUrl);

      if (!response.data || response.data.status === 'ZERO_RESULTS') {
        return res.status(422).send(`Could not find the coordinates error ${response.data}`);
      }

      const location = response.data.results[0].geometry?.location;
  
      if (!location) {
        return res.status(422).send('No location found');
      }

      let imgs = [];

      for (let i = 0; i < images.length; i++) {
        imgs.push(images[i]);
      }

      const property = {
        owner: req.user._id,
        title: formData.title,
        country: formData.country,
        prov_state: formData.prov_state,
        city: formData.city,
        address: formData.address,
        price: formData.price,
        postalCode: formData.postCode,
        description: formData.desc,
        geocode: [location.lat, location.lng],
        images: imgs,
      };
      const listing = new Listing(property);
      await listing.save();
      res.redirect(process.env.FRONTEND_URL);
    } catch (err) {
      console.error('Geocoding request error:', err);
      res.status(500).send('Server error');
    }
  }
);

app.get("/properties/:id/picture/:idx", async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await Listing.findById(propertyId);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    let img = property.images[req.params.idx];

    res.setHeader("Content-Type", img.mimetype);
    res.sendFile(img.filename, {
      root: path.join(__dirname, "/public/uploads"),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/properties", async (req, res) => {
  let query = {};
  const { search, minPrice, maxPrice } = req.query;

  // Build query for text search if applicable
  if (search) {
    const searchRegex = new RegExp(search, "i");
    query.$or = [
      { city: searchRegex },
      { prov_state: searchRegex },
      { country: searchRegex },
    ];
  }

  if (minPrice) {
    query.price = { ...query.price, $gte: parseFloat(minPrice) };
  }

  if (maxPrice) {
    query.price = { ...query.price, $lte: parseFloat(maxPrice) };
  }

  try {
    const listings = await Listing.find(query).limit(30);
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/properties/:id", async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await Listing.findById(propertyId);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/:id", async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await Listing.findById(propertyId);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    // Remove the property
    try {
      await Listing.deleteOne({ _id: propertyId });

      await Booking.deleteMany({ property: propertyId });

      return res.status(200).send("Property deleted successfully.");
    } catch (error) {
      console.error("Error deleting property:", error);
      return res.status(500).send("Error deleting property");
    }

    // Delete associated images
    // property.images.forEach((image) => {
    //     const imagePath = path.join(__dirname, 'public/uploads', path.basename(image.path));
    //     fs.unlink(imagePath, (err) => {
    //         if (err) {
    //             console.error(`Error deleting image: ${err}`);
    //         }
    //     });
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/properties/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the property by ID
    const property = await Listing.findById(id).limit(10);

    if (!property) {
      res.status(404).send("Property not found");
      return;
    }

    res.json({ comments: property.comments || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/properties/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { username, rating, message } = req.body;

  try {
    // Find the property by ID
    const property = await Listing.findById(id);

    if (!property) {
      res.status(404).send("Property not found");
      return;
    }

    // Check if the property has comments array
    if (!Array.isArray(property.comments)) {
      property.comments = [];
    }

    // Check if there's an existing comment from the same user
    const existingCommentIndex = property.comments.findIndex(
      (c) => c.username === username
    );

    if (existingCommentIndex >= 0) {
      // Update existing comment
      property.comments[existingCommentIndex] = { username, rating, message };
    } else {
      // Add new comment
      property.comments.push({ username, rating, message });
    }

    // Update the property with the new comments
    await Listing.findByIdAndUpdate(id, {
      $set: { comments: property.comments },
    });

    res.status(200).json({ comments: property.comments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`${process.env.BACKEND_URL} is running!`);
});
