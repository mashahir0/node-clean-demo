import { Request, Response } from "express";
import { BaseRoute } from "../baseRoute";
import { authController, userController } from "frameworks/Di/resolver";
import { authorizeRole, decodeToken, verifyAuth } from "interface-adapters/middleWare/authMiddleWare";


export class AdminRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.get('/admin/userlist',verifyAuth,authorizeRole(["admin"]),(req : Request, res:Response)=>{
            userController.getAllUsers(req, res)
        })
        this.router.post('/admin/refrsh-token',decodeToken,(req:Request,res:Response)=>{
            authController.refreshToken(req,res)
        })
    }
}