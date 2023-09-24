import { Module } from '@nestjs/common';

import { LoginModule } from './modules/login/login.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
