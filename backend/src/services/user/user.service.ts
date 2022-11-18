import { AuthResponse } from '../../utils/types/AuthResponse';
import User from "./user.interface";


class UserService{
    public async register(user: User): Promise<AuthResponse|void>{
        
    }

    public async login(email: string, password: string): Promise<AuthResponse | void>{
        
    }

}

export default UserService;