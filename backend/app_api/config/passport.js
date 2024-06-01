import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/user.js"; // User modelini import ettik

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (email, password, done) => {
            User.findOne({ email: email }).then((user) => {
                if (!user || !user.checkPassword(password)) {
                    return done(false);
                } else return done(user);
            });
        }
    )
);
