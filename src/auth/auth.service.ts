/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}
   
    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.usersService.getSingleUser(username);
        
        if(user && user.password === password){
            const {password,username, ...rest}= user;
            return user;
        }
   
        return null;
    }
   }