/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, NotFoundException, HttpException } from "@nestjs/common";

import { Users } from "./users.model";


@Injectable()
export class UsersService{

    private readonly users: Users[]=[
        {
            id: 1,
            username: 'swarnpallav',
            name: 'Swarn Pallav Bhaskar',
            password: 'Swarn@123'
        },
        {
            id: 2,
            username: 'blackenigma',
            name: 'Enigma',
            password: 'Enigma@123'
        }
    ];

    userLogin(username: string){
        const user = this.findUser(username)[0];
        if(user)
        {
            return user.name;
        }
    }

    hello(user: string){
        if(user)
        return "Hello "+user;
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    userLogout(user: string){
        if(user)
        {
            return user+": logged out successfully";
        }
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    private findUser(username: string):[Users, number]{
        const userIndex = this.users.findIndex((user) => user.username === username);
        const user = this.users[userIndex];
        if(!user){
            throw new NotFoundException('Could not find User');
        }
        return [user, userIndex];
    }
}