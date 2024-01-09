import Listing from "../models/listing.mjs";

export async function getListings (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);

    const ownerId = req.user.id;

    try {
      const listings = await Listing.find({ owner: ownerId });
  
      res.json(listings);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
};


