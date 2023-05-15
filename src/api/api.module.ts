import { Module } from '@nestjs/common';
import { AuthModule } from '@lib/auth';
import { ResolversModule } from './resolvers';

@Module({
  imports: [AuthModule, ResolversModule],
})
export class ApiModule {}
