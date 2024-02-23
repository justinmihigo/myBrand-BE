import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User, { IUser } from '../models/User';

const JWT_SECRET = 'TOP_SECRET';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

const strategy = new Strategy(options, (payload:{user:IUser}, done:VerifiedCallback) => {
  User.findOne({ email: payload.user.email })
    .then((user) => {
      if (user) {
        console.log(payload);
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(strategy);

export default passport;