import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../role.decorators";
import { Role } from "src/types";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

        canActivate(context: ExecutionContext): boolean {

            const requierdRole = this.reflector.getAllAndOverride<Role[] | undefined >(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),

            ]);

            console.log('requiredRole', requierdRole);

            if ( typeof requierdRole == 'undefined' || requierdRole.length ===0){
                return true;
            }

            const { user } = context.switchToHttp().getRequest();
            return requierdRole.some ((role) => user.roles?.includes(role));
        

        }
    }





