import express from 'express'
import { getBookings, makeBooking } from '../controllers/bookings.mjs';

const router = express();

const isAuthenticated = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!req.isAuthenticated()) return res.status(401).end("access denied");
    next();
  };

router.get('/my_bookings', isAuthenticated, getBookings) 
router.post('/book', isAuthenticated, makeBooking)

export default router;
