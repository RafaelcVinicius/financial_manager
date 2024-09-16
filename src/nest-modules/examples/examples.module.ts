import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EXAMPLE_PROVIDERS } from './examples.provider';
import ExampleModel from '../../@core/examples/infra/db/sequelize/models/example.model';
import { ExamplesController } from './examples.controller';

@Module({
  imports: [SequelizeModule.forFeature([ExampleModel])],
  controllers: [ExamplesController],
  providers: [
    ...Object.values(EXAMPLE_PROVIDERS.USE_CASES),
    ...Object.values(EXAMPLE_PROVIDERS.REPOSITORIES),
  ],
  exports: [EXAMPLE_PROVIDERS.REPOSITORIES.EXAMPLE_REPOSITORY.provide],
})
export class ExamplesModule {}
