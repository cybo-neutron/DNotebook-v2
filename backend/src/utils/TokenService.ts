import { Token } from './interfaces/token.interface';
import jwt from 'jsonwebtoken';
import User from '../services/user/user.interface';
import HttpException from './exceptions/http.exception';
import TokenPayload from './types/TokenPayload';

const createToken = (payload:TokenPayload): string =>{
    return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret,{expiresIn:'1d'});
}

const verifyToken= (token: string): Token|jwt.VerifyErrors =>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
        return decoded as Token;
    } catch (err) {
        throw new HttpException(400, "Invalid token");
    }
}


const TokenService = {
    createToken,verifyToken
}

export default TokenService;