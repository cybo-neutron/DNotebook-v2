import HttpException from '../../utils/exceptions/http.exception';
import TokenService from '../../utils/TokenService';
import { AuthResponse } from '../../utils/types/AuthResponse';
import TokenPayload from '../../utils/types/TokenPayload';
import User from "./user.interface";
import UserModel from './user.model';


class UserService{
    

    public register = async (user: User): Promise<AuthResponse | void> => {
        console.log(user);
        
        try {
            const findUser = await UserModel.findOne({ email: user.email });
            console.log({ findUser });
            if (findUser)
            {
                throw new HttpException(400, "User already exist");
            }
            const createdUser = await UserModel.create(user);
            console.log("🚀 ~ file: user.service.ts ~ line 14 ~ UserService ~ register=async ~ createdUser", createdUser)
            
            const payload = { name: createdUser.name, email: createdUser.email, user_id: createdUser._id,password:createdUser.password};
            const accessToken = TokenService.createToken(payload as TokenPayload);

            return { token: accessToken } as AuthResponse;
        } catch (err:any) {
            console.log(err);
            
            throw new HttpException(400, err.message);
        }
    }

    public async login(email: string, password: string): Promise<AuthResponse | void>{
        try {
            const user = await UserModel.findOne({ email });

            //Check if user with that email exist or not
            if (!user)
            {
                throw new HttpException(400, "Wrong Credentials");
            }

            //Verify password
            if (await user.isValidPassword(password)) {
                const payload = { name: user.name, email, user_id: user._id ,password:user.password};
                const accessToken = TokenService.createToken(payload);
                
                return { token: accessToken } as AuthResponse;

            } else {
                throw new HttpException(400, "Wrong Credentials");
            }

            
        } catch (err:any) {
            throw new HttpException(400, err.message);
        }
    }

}

export default UserService;