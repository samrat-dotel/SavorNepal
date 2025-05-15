import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import User from '../models/User.mjs';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ where: { email: profile.emails[0].value } });
        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: 'oauth', // You can mark it in DB as oauth-authenticated
        });

        return done(null, newUser);
    } catch (err) {
        done(err, null);
    }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'displayName']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
            name: profile.displayName,
            email,
            password: 'oauth',
        });

        return done(null, newUser);
    } catch (err) {
        done(err, null);
    }
}));
