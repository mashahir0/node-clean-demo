import { Role } from "entity/models/IUser.entitly"

export interface IRefreshTokenRepository{
    save(data : {
        token :string,
        userType : Role,
        user : string,
        expiresAt : number
    }) :Promise<void>
    revokeRefrehToken(token: string) : Promise<void>
}