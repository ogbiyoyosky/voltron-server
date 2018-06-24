let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

import UserSchema from '../api/user/user.model';  

 
/** Check if the JWT matches an user in the database. */
module.exports = function(passport) { 
  let opts = {jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), secretOrKey: process.env.SECRET  || "miracle123"};
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    UserSchema.findOne({_id: jwt_payload._id}, (err, user) => {
    	if(err){
        return done(err, false);
      }
      if(user){
        done(null, user);
      }else{
        done(null, false);
      }
    });
  }));
};
