import { Document , ObjectId, Model, model } from "mongoose";
import { IUserEntity } from "entity/models/IUser.entitly";
import { UserSchema } from "../schemas/user.schema";


export interface IUserModel extends Omit<IUserEntity , "id">,Document{
    _id:ObjectId
}

export const UserModel = model<IUserModel>('users',UserSchema)