import { Schema } from "mongoose";
import { IRefreshTokenMoel } from "../schemas/refresh.token.schema";



export const RefreshTokenSchema = new Schema<IRefreshTokenMoel>({
    user:{type :Schema.Types.ObjectId, required : true},
    userType : {
        type :String,
        enum : ["user" , "admin"],
        required: true
    },
    token:{type : String ,required : true},
    expiresAt : {type :Date , required : true , index : {expires : 0}}

})