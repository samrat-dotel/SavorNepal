import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import User from '../models/user.mjs';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = process.env;

passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findByPk(data.id);
    if (user) user.role = data.role; // preserve role
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


// ✅ Google Strategy (with req)
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true, // using req, so must be true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ where: { email } });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            password: 'oauth',
            role: 'admin', // or 'admin' if needed
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ✅ Facebook Strategy (remove req or add passReqToCallback)
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'displayName'],
      passReqToCallback: true, // added to match callback signature
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ where: { email } });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            password: 'oauth',
            role: 'user',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
