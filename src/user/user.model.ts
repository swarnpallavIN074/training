/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export interface User extends Document {
    name: string;
    username: string;
    password: string;
    role: ['USER','ADMIN'];
    createdAt: Date;
}

export const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: ['USER','ADMIN'],
    createdAt: { type: Date, default: Date.now }
});