
import { IGetAllUsersUseCase } from "entity/useCaseInterfases/admin/IGetAllUsersUseCase";
import { IGenerateTokenUseCase } from "entity/useCaseInterfases/auth/IGenerateToken-useCase";
import { ILoginUseCase } from "entity/useCaseInterfases/auth/ILogin-useCase.interface";
import { IRefreshTokenUseCase } from "entity/useCaseInterfases/auth/IRefreshTokenUseCase";
import { IBcrypt } from "frameworks/security/bcrypt.tnterface";
import { PasswordBcrypt } from "frameworks/security/password.bcrypt";
import { container } from "tsyringe";
import { GetAllUsersUseCase } from "usecases/admin/getAllUsers-UseCase";
import { GenerateTokenUseCase } from "usecases/auth/generateTokenUseCase";
import { AdminLoginstrategy } from "usecases/auth/login/adminLoginStrategy";
import { ILoginStrategy } from "usecases/auth/login/loginStrategy.interface";
import { LoginUseCase } from "usecases/auth/login/loginUseCase";
import { UserLoginStrategy } from "usecases/auth/login/userLoginStratagy";
import { RefreshTokenUseCase } from "usecases/auth/refreshTokenUseCase";
import { IRegister } from "usecases/auth/register/IRegister.interface";
import { UserRegisterUseCase } from "usecases/auth/register/userRegister";


export class UseCaseRegistery{
    static registerUseCases() :void{
        container.register<IBcrypt>("IPasswordBcrypt",{useClass : PasswordBcrypt});

        container.register<IRegister>("IUserRegister",{useClass : UserRegisterUseCase});
        container.register<ILoginUseCase>("ILoginUserUseCase",{useClass : LoginUseCase});

        container.register<ILoginStrategy>("UserLoginStrategy",{useClass : UserLoginStrategy});
        container.register<ILoginStrategy>("AdminLoginStrategy",{useClass : AdminLoginstrategy });
        container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase",{useClass : GenerateTokenUseCase});
        container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase",{useClass : RefreshTokenUseCase});
        container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase",{useClass : GetAllUsersUseCase});
    }
}