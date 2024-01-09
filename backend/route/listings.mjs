import express from 'express'
import { getListings } from '../controllers/listings.mjs';

const router = express();

const isAuthenticated = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (!req.isAuthenticated()) return res.status(401).end("access denied");
    next();
  };

router.get('/my_listings', isAuthenticated, getListings) 

export default router;
