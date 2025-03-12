import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { usersTable } from './db/schema';
import { timestamp } from 'drizzle-orm/mysql-core';
import { Roles } from './db_conection/decorators/role.decorators';
import { Role } from './db_conection/constants';


export class CreateUserDto{
  name: string
  Lastname: string
  email: string
  age: number
  login: string
  password: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(){
    return this.appService.getUsers();
  }
    @Post()
    @Roles(Role.ADMIN)
  CreateUsers(@Body() CrearUsuario: CreateUserDto){
    return this.appService.CreateUsers(CrearUsuario);

  }
 
}
  
