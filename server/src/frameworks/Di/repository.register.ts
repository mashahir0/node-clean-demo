import { container } from "tsyringe";
import { IUserRepository } from "entity/repositoryInterfaces/IUser-repository.interface";
import { UserRepository } from "interface-adapters/repositories/user/user.repository";
import { ITokenService } from "entity/services/ITokenService";
import { JwtService } from "interface-adapters/services/JwtTokenService";
import { IRefreshTokenRepository } from "entity/repositoryInterfaces/IRefreshToken-repositroy";
import { RefreshTokenRepository } from "interface-adapters/repositories/auth/refreshTokenRepository";



export class RepositoryRegistry{
    static registerRepositories() : void {
        container.register<IUserRepository>("IUserRepository",{useClass :UserRepository })
        container.register<ITokenService>("ITokenService",{useClass : JwtService})
        container.register<IRefreshTokenRepository>("IRefreshTokenRepository",{useClass : RefreshTokenRepository})
        
    }
}