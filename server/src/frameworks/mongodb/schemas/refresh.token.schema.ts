import { IRefreshTokenEntity } from "entity/models/IRefreshToken.entity";
import { model, ObjectId } from "mongoose";
import { RefreshTokenSchema } from "../models/refreshToken.model";

export interface IRefreshTokenMoel extends Omit<IRefreshTokenEntity,"id"| "user">,Document{
    _id:ObjectId,
    user:ObjectId
}


export const RefreshTokenModel = model<IRefreshTokenMoel>(
    "RefreshToken",
    RefreshTokenSchema
) 