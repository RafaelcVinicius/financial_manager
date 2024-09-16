import { getModelToken } from '@nestjs/sequelize';
import { ApplicationService } from '../../@core/@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import { ExampleRepository } from '../../@core/examples/infra/db/sequelize/repositories/example.repository';
import ExampleModel from '../../@core/examples/infra/db/sequelize/models/example.model';
import { CreateExampleUseCase } from '../../@core/examples/application/use-case/create-example/create-example.use-case';
import { GetExampleUseCase } from '../../@core/examples/application/use-case/get-example/get-example.use-case';
import { UpdateExampleUseCase } from '../../@core/examples/application/use-case/update-example/update-example.use-case';
import { ListExamplesUseCase } from '../../@core/examples/application/use-case/list-example/list-example.use-case';
import { DeleteExampleUseCase } from '../../@core/examples/application/use-case/delete-example/delete-example.use-case';

export const REPOSITORIES = {
  EXAMPLE_REPOSITORY: {
    provide: 'ExampleRepository',
    useExisting: ExampleRepository,
  },
  EXAMPLE_SEQUELIZE_REPOSITORY: {
    provide: ExampleRepository,
    useFactory: (uow: UnitOfWorkSequelize, model: typeof ExampleModel) => {
      return new ExampleRepository(uow, model);
    },
    inject: ['UnitOfWork', getModelToken(ExampleModel)],
  },
};

export const USE_CASES = {
  CREATE_EXAMPLE_USE_CASE: {
    provide: CreateExampleUseCase,
    useFactory: (
      appService: ApplicationService,
      exampleRepository: ExampleRepository
    ) => {
      return new CreateExampleUseCase(appService, exampleRepository);
    },
    inject: [ApplicationService, REPOSITORIES.EXAMPLE_REPOSITORY.provide],
  },

  GET_EXAMPLE_USE_CASE: {
    provide: GetExampleUseCase,
    useFactory: (exampleRepository: ExampleRepository) => {
      return new GetExampleUseCase(exampleRepository);
    },
    inject: [REPOSITORIES.EXAMPLE_REPOSITORY.provide],
  },

  UPDATE_EXAMPLE_USE_CASE: {
    provide: UpdateExampleUseCase,
    useFactory: (
      appService: ApplicationService,
      exampleRepository: ExampleRepository
    ) => {
      return new UpdateExampleUseCase(appService, exampleRepository);
    },
    inject: [ApplicationService, REPOSITORIES.EXAMPLE_REPOSITORY.provide],
  },

  LIST_EXAMPLE_USE_CASE: {
    provide: ListExamplesUseCase,
    useFactory: (exampleRepository: ExampleRepository) => {
      return new ListExamplesUseCase(exampleRepository);
    },
    inject: [REPOSITORIES.EXAMPLE_REPOSITORY.provide],
  },

  DELETE_EXAMPLE_USE_CASE: {
    provide: DeleteExampleUseCase,
    useFactory: (exampleRepository: ExampleRepository) => {
      return new DeleteExampleUseCase(exampleRepository);
    },
    inject: [REPOSITORIES.EXAMPLE_REPOSITORY.provide],
  },
};

export const EXAMPLE_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
