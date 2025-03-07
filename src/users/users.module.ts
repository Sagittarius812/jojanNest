import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DrizzleModule } from 'src/db_conection/db.module';

@Module({
  imports: [DrizzleModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
