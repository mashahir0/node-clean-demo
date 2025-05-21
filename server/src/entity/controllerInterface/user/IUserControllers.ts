import { Request, Response } from "express";

export interface IUserControllers {
    getAllUsers(req : Request, res:Response) :Promise<void>
}