import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '../config';
import User from '../User/model';

export const loginUser = async (req, res, next) => {
  passport.authenticate('login', async (error, user, info) => {
    if(error) return next(error);

    if(!user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return next(error);
      }

      const payload = {
        userID: user._id,
        username: user.username,
      };

      const token = jwt.sign(
        { user: payload },
        config.secretKey,
      );

      return res.status(200).json({ token, payload });
    });
  })(req, res, next); // auto-invoke
};

export const signupUser = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    if (!(username && password)) return res.status(400).json({ message: "Please provide an username & password!" });
    
    const existingUser = await User.findOne({ username });

    if (existingUser) return res.status(400).json({ message: "Username is already taken!" });

    const newUser = await User.create({ username, password });

    return res.status(201).json({ mesasge: "New user created!" , newUser });
  } catch (error) {
    return next(error);
  }
};