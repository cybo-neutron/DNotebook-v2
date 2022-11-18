import { Schema } from 'mongoose';

export interface Token extends Object {
    expiresIn: number,
    name: String,
    email: String,
    user_id:Schema.Types.ObjectId,
}