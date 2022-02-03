/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { LocalStategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";

@Module({
    imports:[UserModule, PassportModule.register({session: true})],
    controllers:[],
    providers:[AuthService, LocalStategy, LocalAuthGuard, SessionSerializer]
})
export class AuthModule{};