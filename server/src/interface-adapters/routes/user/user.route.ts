import { decodeToken } from "interface-adapters/middleWare/authMiddleWare";
import { BaseRoute } from "../baseRoute";
import { authController } from "frameworks/Di/resolver";
import { Request,Response } from "express";

export class UserRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.post('/user/refresh-token',decodeToken,(req:Request,res:Response)=>{
            authController.refreshToken(req,res)
        })
    }
}