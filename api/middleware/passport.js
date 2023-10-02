import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {secret} from '../configs/environement.js';
import User from '../database/models/userSchema.js';

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

export default function passport_middleware(app){
    passport.use('user',
    new JwtStrategy(options, async function verify(jwt_payload, done){
        console.log('from passport middleware, payload: ', jwt_payload);
        return done(null, {id: 12344})
        //let user = User.findOne()
    }));


    app.use(passport.initialize());
    console.log('initialized passport middleware successfully');

}