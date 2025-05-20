import { Request, Response } from "express";
import { BaseRoute } from "./baseRoute";
import { authController } from "frameworks/Di/resolver";
import { decodeToken } from "interface-adapters/middleWare/authMiddleWare";


export class AuthRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.post('/signup',(req: Request, res:Response) =>{
            authController.register(req, res)
        })
        this.router.post('/login',(req: Request,res:Response)=>{
            authController.login(req,res)
        })
    }
}