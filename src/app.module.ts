import { Module } from '@nestjs/common';
import { ProvidersModule } from '@lib/providers';
import { SharedModule } from '@lib/shared';
import { DomainsModule } from './domains/domains.module';
import { ResolversModule } from './api/resolvers/resolvers.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ProvidersModule,
    SharedModule,
    DomainsModule,
    ResolversModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
