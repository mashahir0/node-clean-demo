import { NextFunction, Request, Response } from "express";
import { JwtService } from "interface-adapters/services/JwtTokenService";
import { JwtPayload } from "jsonwebtoken";

const tokenService = new JwtService()


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


const extractToken =(req:Request) :{access_token : string , refresh_token: string} | null =>{
    const pathSegment  = req.path.split("/").filter(Boolean)
    const userType = pathSegment[0]
    console.log(userType)
   if (!userType) return null;

  const access_token = req.cookies[`${userType}_access_token`];
  const refresh_token = req.cookies[`${userType}_refresh_token`];
  return {
    access_token,
    refresh_token,
  };
}



export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    if (!token?.access_token) {
       res.status(401).json({ message: "Unauthorized: No token provided" });
       return
    }

    const user = tokenService.decodeAccessToken(token.access_token);
    if (!user) {
       res.status(401).json({ message: "Unauthorized: Invalid token" });
       return
    }

    (req as CustomRequest).user = {
      id: user.id,
      email: user.email,
      role: user.role,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };

    next();
  } catch (error) {
    console.error("Token decode error:", error);
     res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};



export const verifyAuth = async (
  req:Request,
  res:Response,
  next:NextFunction
)=>{
 try {
    const token = extractToken(req)
    if(!token){ 
       res.status(500).json({message : "unauthorized access "})
       return
      }
    const user = tokenService.verifyAccessToken(token?.access_token) as CustomJwtPayload
  if(!user || !user.id){
    res.status(404).json({message : "token expired"})
    return 
  }
  (req as CustomRequest).user = {
    ...user,
    access_token : token.access_token,
    refresh_token: token.refresh_token
  }
  next()
 } catch (error) {
  res.status(400).json({message : "invalid token"})
 }
}


export const authorizeRole = (allowedRoles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const user = (req as CustomRequest).user;

        if(!user || !allowedRoles.includes(user.role)){
            console.log("role not allowed");
            res.status(500).json({
                message:"unautharized role",
                userRole:user ? user.role :"None",
            })
            return 
        }
        next();
    }
}