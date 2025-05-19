import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


export interface CustomJwtPayload extends JwtPayload{
    id : string,
    email : string,
    role :string,
    access_token :string,
    refresh_token : string
}

export interface CustomRequest extends Request{
    user : CustomJwtPayload
}