/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Session} from "@nestjs/common";

import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/login/:username')
    userLogin(@Session() session: Record<string, any>, @Param('username') username: string) {
        session.user = this.usersService.userLogin(username);
        return session.user+': Logged In Successfully';
    }

    @Get('/hello')
    hello(@Session() session: Record<string, any>) {
        return this.usersService.hello(session.user);
    }

    @Get('/logout')
    logout(@Session() session: Record<string, any>) {
        const msg = this.usersService.userLogout(session.user);
        session.destroy();
        return msg;
    }
}



