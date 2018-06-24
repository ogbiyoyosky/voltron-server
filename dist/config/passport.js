"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var user_model_1 = require("../api/user/user.model");
/** Check if the JWT matches an user in the database. */
module.exports = function (passport) {
    var opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), secretOrKey: process.env.SECRET || "miracle123" };
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        user_model_1.default.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    }));
};
//# sourceMappingURL=passport.js.map