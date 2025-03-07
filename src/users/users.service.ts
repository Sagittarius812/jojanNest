import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import { usersTable } from 'src/db/schema';
import { PG_CONNECTION } from 'src/db_conection/constants';

type User = {
    id: number;
    name: string;
    lastname: string | null;
    age: number;
    email: string;
    password: string;
    created_at: Date | null;
    role_id: number;
}



@Injectable()
export class UsersService {
    constructor(@Inject(PG_CONNECTION) private db: NeonDatabase){}


    async findone(email: string): Promise<User | undefined> {

        const result =await this.db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

        return result[0];
    } 



}
