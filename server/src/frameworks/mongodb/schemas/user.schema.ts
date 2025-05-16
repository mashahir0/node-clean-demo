import { Schema } from "mongoose";
import { IUserModel } from "../models/user.model";


export const UserSchema = new Schema<IUserModel>({
    name: String,
    email: String,
},
{timestamps : true}
)