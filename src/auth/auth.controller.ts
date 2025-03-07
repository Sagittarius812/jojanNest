import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginUserDto{
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/Login')
    Login(@Body()createUserDto: LoginUserDto){
        const result = this.authService.singin(createUserDto.email, createUserDto.password)
        return result;
    }
}


