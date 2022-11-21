import mongoose from 'mongoose';

export default interface Note extends mongoose.Document{
    title: string,
    description: string,
    user_id:string,
}