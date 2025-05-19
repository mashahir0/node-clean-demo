import { Role } from "entity/models/IUser.entitly";
import { IRefreshTokenRepository } from "entity/repositoryInterfaces/IRefreshToken-repositroy";
import { ITokenService } from "entity/services/ITokenService";
import { IGenerateTokenUseCase } from "entity/useCaseInterfases/auth/IGenerateToken-useCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase{
    constructor(
        @inject("ITokenService") private tokenService:ITokenService,
        @inject("IRefreshTokenRepository") private refreshTokenRepository : IRefreshTokenRepository,
    ){}

    async execute(id: string, email: string, role: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const payload = { id , email , role }

        const accessToken = this.tokenService.generateAccessToken(payload)
        const refreshToken = this.tokenService.generateRefreshToken(payload)

        await this.refreshTokenRepository.save({
            token : refreshToken,
            userType : role as Role,
            user : id,
            expiresAt : Date.now() + 7 * 24 * 60 * 60 * 1000
        })
        return {accessToken , refreshToken}
    }
}