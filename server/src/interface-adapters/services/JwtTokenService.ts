import { ITokenService } from "entity/services/ITokenService";
import jwt,{ JwtPayload, Secret } from "jsonwebtoken";
import { config } from "shared/config";
import { injectable } from "tsyringe";
import ms from 'ms'

@injectable()
export class JwtService implements ITokenService{
    private accessSecret: Secret;
    private accessExpiresIn : string;
    private refreshSecret: Secret;
     private refreshExpiresIn:string;
    private resetSecret:string;
    private resetExpiresIn:string

    constructor(){
        this.accessSecret = config.jwt.ACCESS_SECRET_KEY;
        this.accessExpiresIn = config.jwt.ACCESS_EXPIRES_IN;
        this.refreshSecret = config.jwt.REFRESH_SECRET_KEY;
        this.refreshExpiresIn = config.jwt.REFRESH_EXPIRES_IN;
        this.resetSecret = config.jwt.RESET_SECRET_KEY;
        this.resetExpiresIn = config.jwt.RESET_EXPIRES_IN
    }
    generateAccessToken(payload: { id: string; email: string; role: string; }): string {
        return jwt.sign(payload,this.accessSecret,{expiresIn : this.accessExpiresIn as ms.StringValue})
    }
    generateRefreshToken(payload: { id: string; email: string; role: string; }): string {
        return jwt.sign(payload,this.refreshSecret,{expiresIn : this.refreshExpiresIn as ms.StringValue})
    }
    verifyAccessToken(token: string): string | jwt.JwtPayload | null {
        try {
            return jwt.verify(token,this.accessSecret) as JwtPayload
        } catch (error) {
            console.log("access Token verification faild ", error)
            return null
        }
    }
    verifyRefreshToken(token: string): string | JwtPayload | null {
        try {
            return jwt.verify(token,this.refreshSecret) as JwtPayload
        } catch (error) {
            console.log("refresh token verification faild" , error)
            return null
        }
    }

}