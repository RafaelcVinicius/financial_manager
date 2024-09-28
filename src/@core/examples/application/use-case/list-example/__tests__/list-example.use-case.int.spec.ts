import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { ExampleEntity } from '../../../../domain/entities/example.entity';
import ExampleModel from '../../../../infra/db/sequelize/models/example.model';
import { ExampleRepository } from '../../../../infra/db/sequelize/repositories/example.repository';
import { ListExamplesUseCase } from '../list-example.use-case';

describe('ListExampleUseCase Unit Tests', () => {
  let useCase: ListExamplesUseCase;
  let repository: ExampleRepository;
  let entity: ExampleEntity;

  const setup = setupSequelize({ models: [ExampleModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new ExampleRepository(uow, ExampleModel);
    useCase = new ListExamplesUseCase(repository);
  });

  it('should list a examples', async () => {
    entity = ExampleEntity.mock();
    repository.create(entity);

    const spyInsert = jest.spyOn(repository, 'search');
    const output = await useCase.execute({});

    expect(spyInsert).toHaveBeenCalledTimes(1);
    await expect(output).toStrictEqual({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 1,
      items: [{ ...entity.toJSON(), updated_at: output.items[0].updated_at }],
    });
  });
});
