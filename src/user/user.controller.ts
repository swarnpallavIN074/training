/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { Roles } from "./role.decorator";
import { Role } from "./role.enum";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return { msg: 'Logged in!' };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('hello')
    getHello(@Request() req): string {
        return req.user;
    }

    @UsePipes(ValidationPipe)
    @Post('signup')
    signup(@Body() body): any {
        const newUser = this.userService.addUser(body);
        return { msg: `${newUser} signed up` }
    }

    @Get('logout')
    logout(@Request() req): any {
        req.logOut();
        return { msg: 'User Logged Out!' }
    }

    @Get('getusers')
    @UseGuards(AuthenticatedGuard)
    @Roles(Role.ADMIN)
    async getAllUsers(){
        return await this.userService.getUsers();
    }

}