import HttpException from '../../utils/exceptions/http.exception';
import TokenService from '../../utils/TokenService';
import { AuthResponse } from '../../utils/types/AuthResponse';
import User from "./user.interface";
import UserModel from './user.model';


class UserService{
    

    public register = async (user: User): Promise<AuthResponse | void> => {
        console.log(user);
        
        try {
            const createdUser = await UserModel.create(user);
            console.log("🚀 ~ file: user.service.ts ~ line 14 ~ UserService ~ register=async ~ createdUser", createdUser)
            
            const accessToken = TokenService.createToken(user as User);

            return { token: accessToken } as AuthResponse;
        } catch (err) {
            console.log(err);
            
            throw new HttpException(400, "Unable to create new user");
        }
    }

    public async login(email: string, password: string): Promise<AuthResponse | void>{
        
    }

}

export default UserService;