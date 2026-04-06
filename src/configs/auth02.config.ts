import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Users } from "../Models/Users.model";
import { generateRandomString } from "../helpers/randomString.helper";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/api/client/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;

        let user = await Users.findOne({ where: { email } });

        if (!user) {
          user = await Users.create({
            email,
            fullName: profile.displayName,
            password: generateRandomString(10),
          });
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;