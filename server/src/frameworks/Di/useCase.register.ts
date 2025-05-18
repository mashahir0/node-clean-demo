
import { ILoginUseCase } from "entity/useCaseInterfases/auth/ILogin-useCase.interface";
import { IBcrypt } from "frameworks/security/bcrypt.tnterface";
import { PasswordBcrypt } from "frameworks/security/password.bcrypt";
import { container } from "tsyringe";
import { AdminLoginstrategy } from "usecases/auth/login/adminLoginStrategy";
import { ILoginStrategy } from "usecases/auth/login/loginStrategy.interface";
import { LoginUseCase } from "usecases/auth/login/loginUseCase";
import { UserLoginStrategy } from "usecases/auth/login/userLoginStratagy";
import { IRegister } from "usecases/auth/register/IRegister.interface";
import { UserRegisterUseCase } from "usecases/auth/register/userRegister";


export class UseCaseRegistery{
    static registerUseCases() :void{
        container.register<IBcrypt>("IPasswordBcrypt",{useClass : PasswordBcrypt});

        container.register<IRegister>("IUserRegister",{useClass : UserRegisterUseCase});
        container.register<ILoginUseCase>("ILoginUserUseCase",{useClass : LoginUseCase})

        container.register<ILoginStrategy>("UserLoginStrategy",{useClass : UserLoginStrategy});
        container.register<ILoginStrategy>("AdminLoginStrategy",{useClass : AdminLoginstrategy })
    }
}