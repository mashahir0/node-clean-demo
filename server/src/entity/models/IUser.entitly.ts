export type Role = "user" | "admin"

export interface IUserEntity{
    id?:string;
    name:string;
    email:string;
    password:string;
    role:Role
}