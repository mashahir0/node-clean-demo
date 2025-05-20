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

// const extractToken = (req: Request): { access_token: string; refresh_token: string } | null => {
//   const possibleRoles = [ 'user','admin']; 

//   for (const role of possibleRoles) {
//     const accessToken = req.cookies[`${role}_access_token`];
//     const refreshToken = req.cookies[`${role}_refresh_token`];

//     if (accessToken || refreshToken) {
//       return {
//         access_token: accessToken,
//         refresh_token: refreshToken
//       };
//     }
//   }

//   return null;
// };

const extractToken =(req:Request) :{access_token : string , refresh_token: string} | null =>{
    console.log(req.cookies)
    console.log(req.path)
    const pathSegment  = req.path.split("/").filter(Boolean)
    console.log(pathSegment)
    const userType = pathSegment[0]
   if (!userType) return null;

  const access_token = req.cookies[`${userType}_access_token`];
  const refresh_token = req.cookies[`${userType}_refresh_token`];
  console.log(access_token , refresh_token)
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
    console.log(token)
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