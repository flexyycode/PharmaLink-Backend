import { Injectable, UnauthorizedException } from "@nestjs/common"; 
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";  

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {  
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    } 

    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false, 
        secretOrKey: jwtSecret, // ← use this instead of process.env.JWT_SECRET!
    });  
}
    async validate(payload: any) { 
        console.log('JWT payload received:', payload)
        if(!payload) {
            throw new UnauthorizedException ()
        } 

        const user = {
            id: payload.sub,
            email: payload.email, 
            role: payload.role, 
        } 

        console.log('Returning user:', user) 
        return user; 
    }   
}