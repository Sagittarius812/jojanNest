import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import { rolesTable, usersTable } from 'src/db/schema';
import { PG_CONNECTION } from 'src/db_conection/constants';

type User = {
    id: number;
    name: string;
    lastname: string | null;
    email: string;
    password: string;
    role: string;
}



@Injectable()
export class UsersService {
    constructor(@Inject(PG_CONNECTION) private db: NeonDatabase){}


    async findone(email: string): Promise<User | undefined> {

        const result =await this.db.select({
            id: usersTable.id,
            email: usersTable.email,
            password: usersTable.password,
            name: usersTable.name,
            lastname: usersTable.lastname,
            role: rolesTable.name
        })
        .from(usersTable)
        .innerJoin(rolesTable, eq(rolesTable.id, usersTable.role_id))
        .where(eq(usersTable.email, email));

        return result[0];
    } 



}
