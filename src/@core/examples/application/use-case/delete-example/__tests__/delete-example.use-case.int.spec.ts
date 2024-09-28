import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { ExampleEntity } from '../../../../domain/entities/example.entity';
import ExampleModel from '../../../../infra/db/sequelize/models/example.model';
import { ExampleRepository } from '../../../../infra/db/sequelize/repositories/example.repository';
import { GetExampleUseCase } from '../../get-example/get-example.use-case';

describe('GetExampleUseCase Integration Tests', () => {
  let useCase: GetExampleUseCase;
  let repository: ExampleRepository;
  let entity: ExampleEntity;

  const setup = setupSequelize({ models: [ExampleModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new ExampleRepository(uow, ExampleModel);
    useCase = new GetExampleUseCase(repository);
  });

  it('should create a Example', async () => {
    entity = ExampleEntity.mock();
    repository.create(entity);

    const output = await useCase.execute({ id: entity.id.value });

    expect(output).toStrictEqual({
      ...entity.toJSON(),
      updated_at: output.updated_at,
    });
  });
});
