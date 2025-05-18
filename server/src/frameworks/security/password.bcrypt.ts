import { injectable } from "tsyringe";
import { IBcrypt } from "./bcrypt.tnterface";
import bcrypt from 'bcryptjs';
import { config } from "shared/config";


@injectable()
export class PasswordBcrypt implements IBcrypt{
    async hash(original: string): Promise<string> {
        return bcrypt.hash(original,config.bcryptSaltRounds)
    }
    async compare(current: string, original: string): Promise<boolean> {
        return bcrypt.compare(current,original) 
    }
}