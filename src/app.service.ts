import { Inject, Injectable } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { NeonDatabase } from 'drizzle-orm/neon-serverless'
import { PG_CONNECTION } from './db_conection/constants';
import { rolesTable, usersTable } from './db/schema';
import { CreateUserDto } from './app.controller';
import { eq } from 'drizzle-orm';
import * as  argon2 from "argon2"


@Injectable()
export class AppService {

  constructor(@Inject(PG_CONNECTION) private db: NeonDatabase){}




  async getUsers() {
    const result = await this.db
    .select({
      id:usersTable.id,
      nombre: usersTable.name,
      apellido: usersTable.lastname,
      role: rolesTable.name
  })
    .from(usersTable)
    .innerJoin(rolesTable, eq(usersTable.role_id, rolesTable.id))  
    return result;    
  }
  async CreateUsers(CreateUserData:CreateUserDto){
    try{
      const hashedPassword = await argon2.hash(CreateUserData.password)


    const newUser={
          ...CreateUserData,
          password: hashedPassword,
          role_id: 1,
    }

    await this.db.insert(usersTable).values(newUser);

  }catch (error){
    throw new Error('Error alcrear el usuario:' + error);
  }
    return 'Usuario registrado';  
  }
}


