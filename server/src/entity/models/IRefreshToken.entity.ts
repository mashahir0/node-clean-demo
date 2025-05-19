import { Role } from "./IUser.entitly";

export interface IRefreshTokenEntity {
    id?:string;
    token:string;
    user:string;
    userType:Role;
    expiresAt:Date;
    createdAt?:Date;
    updatedAt?:Date;
}