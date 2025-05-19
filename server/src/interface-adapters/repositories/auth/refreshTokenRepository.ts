import { Role } from "entity/models/IUser.entitly";
import { IRefreshTokenRepository } from "entity/repositoryInterfaces/IRefreshToken-repositroy";
import { RefreshTokenModel } from "frameworks/mongodb/schemas/refresh.token.schema";
import { injectable } from "tsyringe";

@injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository{
    async save(data: { token: string; userType: Role; user: string; expiresAt: number; }): Promise<void> {
        await RefreshTokenModel.create({
            token : data.token,
            user : data.user,
            userType : data.userType,
            expiresAt : data.expiresAt
        })
    }
    async revokeRefrehToken(token: string): Promise<void> {
        await RefreshTokenModel.deleteOne({token})
    }
}