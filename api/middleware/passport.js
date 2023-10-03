import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { secret } from "../configs/environement.js";
import User from "../database/models/userSchema.js";

const cookieExtractor = function(req){
  let token = null;
  if(req.cookies.token){
    token = req.cookies.token;
  }
  console.log('cookie jwt extractor');
  return token;
};

let options = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]),
  secretOrKey: secret,
};

export default function passport_middleware(app) {
  passport.use(
    "user",
    new JwtStrategy(options, async function verify(jwt_payload, done) {
      try{
        let user = await User.findOne({_id: jwt_payload._id});
        if(user){
          return done(null, user);
        }
      }
      catch(error){
        console.log(error)
      }
      console.log("from passport middleware, payload: ", jwt_payload);
      return done(null, false);
    })
  );

  app.use(passport.initialize());
  console.log("initialized passport middleware successfully");
}
