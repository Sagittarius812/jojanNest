import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../role.decorators";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/db_conection/constants";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor ( 
        private reflector: Reflector,
        private jwtService: JwtService,
    ){}

        canActivate(context: ExecutionContext): boolean {

            const requierdRole = this.reflector.getAllAndOverride<Role[] | undefined >(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),

            ]);

            const request = context.switchToHttp().getRequest();
            const bearerToken = request.headers.authorization as string | undefined; 

            if ( typeof requierdRole == 'undefined' || requierdRole.length ===0){
                return true;
            }
     
            if (typeof bearerToken == "undefined"){
                return false 
            };

            const tokensinbearer = bearerToken.replace ("Bearer ", "" ); 
            const  payloadToken = this.jwtService.decode(tokensinbearer);

           console.log(payloadToken.role); 

            console.log('requiredRole', requierdRole);

           
            const elUsuarioTieneElRolRequerido = requierdRole.includes(payloadToken.role)
            return elUsuarioTieneElRolRequerido

        }
    }





