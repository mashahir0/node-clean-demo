import { ITokenService } from "entity/services/ITokenService";
import { IRefreshTokenUseCase } from "entity/useCaseInterfases/auth/IRefreshTokenUseCase";
import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";


@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase{
    constructor(
        @inject("ITokenService") private tokenService : ITokenService
    ){}
    execute(refreshToken: string): { role: string; accessToken: string; } {
        const payload = this.tokenService.verifyRefreshToken(refreshToken)
        if(!payload) throw  new Error("Invalid Refresh token")
        return {
            role : (payload as JwtPayload).role,
            accessToken:this.tokenService.generateAccessToken({
                id:(payload as JwtPayload).id,
                email : (payload as JwtPayload).email,
                role: (payload as JwtPayload).role
            })
        }
    }
}