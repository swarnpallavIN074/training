/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createUserDTO } from "./user.dto";
import { User } from "./user.model";

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}


    async getUsers() {
        const users = await this.userModel.find();
        return users;
    }


    async getSingleUser(username: string){
        let user;
        try{
            user = await this.userModel.findOne({username: username});
        }catch(error){
            throw new NotFoundException('User Not Found');
        }
        return user;
    }

    async addUser(createUserDTO: createUserDTO){
        const newUser = new this.userModel(createUserDTO);
        newUser.save();
        return newUser;
    }

}