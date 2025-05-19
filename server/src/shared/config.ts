import dotenv from 'dotenv'
dotenv.config()


export const config = {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),
    jwt:{
        ACCESS_SECRET_KEY: process.env.JWT_ACCESS_KEY || "access-secret-key",
		REFRESH_SECRET_KEY: process.env.JWT_REFRESH_KEY || "refresh-secret-key",
		ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
		REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        RESET_SECRET_KEY:process.env.JWT_RESET_KEY || "reset-secret-key",
        RESET_EXPIRES_IN:process.env.JWT_RESET_EXPIRES_IN || "5m"
    },
     server:{
        NODE_ENV:process.env.NODE_ENV || "development",
    },
}