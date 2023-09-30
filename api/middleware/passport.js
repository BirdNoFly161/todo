import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {secret} from '../configs/environement.js';

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: secret
}

export default function (app){
    
}