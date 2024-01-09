import express from 'express'
const router = express();
import cors from "cors";
import passport from 'passport';
import { signup,
         login,
         logout,
         regLogIn,
         auth,
         getUsername } from '../controllers/user.mjs';


router.use(cors());

const isAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated()) return res.status(401).end("access denied");
    next();
  };

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


router.post('/signup', signup) 

router.get('/signup', regLogIn) 

router.route('/login')
    // .get(users.renderLogin) add in when react file is done
    .post(passport.authenticate('local'), login)

router.get('/logout', isAuthenticated, logout)

router.get('/auth', isAuthenticated, auth)

router.get('/username', getUsername)

export default router;


