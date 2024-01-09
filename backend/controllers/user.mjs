import User from '../models/user.mjs';
import passport from 'passport';



export async function regLogIn (req, res) {
    //sign in and log in automatically
    req.login(registeredUser, err => {
      if (err) return next(err);
      // req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/');
  })
};


export async function getUsername (req, res) {

  //sign in and log in automatically
  if (req.isAuthenticated()){
    // Send the username back to the client
    return res.status(200).json({ message: 'User authenticated', username: req.user.username, id: req.user.id });
  }
  return res.status(401).json({message: "not signed in and can't access since"});
};


export async function signup (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("Origin"));
  res.header("Access-Control-Allow-Credentials", true);
    const { username, fname, lname, email, password } = req.body;
    const userExist = await User.findOne({email: email});
    if (userExist){
        return res.status(401).json({
            success: false,
            message: "Email already exists",
            field: "email"
        })
    }
    const usernameExist = await User.findOne({username: username});
    if (usernameExist){
        return res.status(401).json({
            success: false,
            message: "Username already exists",
            field: "username"
        })
    }
   
    try {
        
        const user = new User({ username, fname, lname, email});
        const registeredUser = await User.register(user, password);
        
        // res.status(200).json({
        //     success: true,
        //     message: "user created"
        // })
        req.login(registeredUser, err => {
            if (err) return next(err);
            // req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect(process.env.FRONTEND_URL);
        })
    } catch (e) {
        // req.flash('error', e.message);
        // res.redirect('register');
        console.log(e);
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
   
}


export const login = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
    res.header("Access-Control-Allow-Credentials", true);
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({message: "Invalid Credentials"});
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        
        res.status(200).redirect(process.env.FRONTEND_URL);
        // res.status(200).json({user: req.user});
        // getUsername(req, res);
        // return res.status(200);
        // return res.json({ message: 'Login successful', user });
        
      });
    })(req, res, next);
  };
  
  export const logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Error logging out' });
        }
        // res.status(200).json({ message: 'Logout successful' });
        res.redirect(process.env.FRONTEND_URL);
        
      });
    });
  };

  export const auth = (req, res) => {

    // res.header("Access-Control-Allow-Origin", req.header("Origin"));
    // res.header("Access-Control-Allow-Credentials", true);

    if (req.isAuthenticated()) {
      // User is authenticated
      res.status(200).json({ isLoggedIn: true });
    } else {
      // User is not authenticated
      res.status(200).json({ isLoggedIn: false });
    }
  }