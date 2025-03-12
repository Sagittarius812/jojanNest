import { Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import { PG_CONNECTION } from 'src/db_conection/constants';
import { UsersService } from 'src/users/users.service';
import * as  argon2 from "argon2"
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';


@Injectable()
export class AuthService {

    constructor(@Inject(PG_CONNECTION) private db: NeonDatabase, 
    private usersService: UsersService,
    private jwtService: JwtService
    ){}

    async singin(email: string, password: string){

        const user = await this.usersService.findone(email);

        if (!user){
            throw new UnauthorizedException('Usuario no encontrado');
        }

        const authorized = await argon2.verify(user.password, password);

        if (authorized === false){
            throw new UnauthorizedException('contraseña incorrecta');
        }

        const payload = {sub: user.id, role: user.role};

        return {
            access_token: await this.jwtService.signAsync(payload, {expiresIn: 60*60}),
        };
        
    }

}
