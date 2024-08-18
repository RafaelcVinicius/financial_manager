import { Global, Module } from '@nestjs/common';
import { USE_CASE_PROVIDERS } from './shared.providers';

@Global()
@Module({
  providers: [...Object.values(USE_CASE_PROVIDERS.REPOSITORIES)],
  exports: [
    USE_CASE_PROVIDERS.REPOSITORIES.APPLICATION_SERVICE_SEQUELIZE_REPOSITORY
      .provide,
  ],
})
export class SharedModule {}
