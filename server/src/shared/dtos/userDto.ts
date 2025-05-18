import { Role } from "entity/models/IUser.entitly";

export interface RegUserDto{
    name: string;
    email : string;
    password: string;
    role:"user"
}

export interface LoginUserDto{
    email:string;
    password : string;
    role:Role;
}