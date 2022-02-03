/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class createUserDTO{

    
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    role: ['USER','ADMIN'];

    createdAt: Date;
}