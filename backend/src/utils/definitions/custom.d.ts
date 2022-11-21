import User from "../../services/user/user.interface";


declare global{
    namespace Express{
        export interface Request{
            user?:User,
        }
    }
}