/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean{
        //required role?
        const requiredRoles =this.reflector.getAllAndOverride<Role[]>('roles',[
            context.getHandler(),
            context.getClass()
        ]);
        if(!requiredRoles){
            return true;
        }
       //check if current user has that role?
       const { user } = context.switchToHttp().getRequest(); 
        
       console.log(requiredRoles);
       console.log(user.role);
        return requiredRoles.some(role => user.role.includes(role));
        
    }
}