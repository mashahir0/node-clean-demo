import { Request, Response } from "express";

export interface IAuthController{
    register(req:Request,res:Response) :Promise<void>;
    login(req:Request , res:Response) :Promise<void>;
    refreshToken(req:Request , res :Response) :Promise <void>
}