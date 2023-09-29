import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
}

export default function (app){
    
}