import Booking from "../models/booking.mjs";
import Listing from "../models/listing.mjs";

export function getBookings (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    let resList = []
    const userId = req.user.id;

    try {
      Booking.find({ user: userId }).then(bookings => {
        Promise.all(bookings.map(async ({ property, startDate, endDate, totalCost }) => {
          let { _id, address, city, country, description, title } = await Listing.findById(property)
          resList.push({startDate, endDate, totalCost, _id, address, city, country, description, title });
        })).then(() => res.json(resList))
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
};

export async function makeBooking (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);

    const formData = req.body;

    const booking = {
      user: req.user._id,
      property: formData.property,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalCost: formData.totalCost
    };

    try {
      const make_booking = new Booking(booking);
      await make_booking.save();
      res.status(200);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
};

