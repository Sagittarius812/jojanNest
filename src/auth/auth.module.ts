import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTsecret } from 'src/db_conection/constants';
import { DrizzleModule } from 'src/db_conection/db.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
  UsersModule,
    DrizzleModule,
    JwtModule.register({
          global: true,
          secret: JWTsecret,  
        }),

  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
