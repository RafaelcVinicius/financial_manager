import { ExampleEntity } from '../../../../domain/entities/example.entity';
import { ExampleInMemoryRepository } from '../../../../infra/db/in-memory/example-in-memory.repository';
import { GetExampleUseCase } from '../get-example.use-case';

describe('GetExampleUseCase Unit Tests', () => {
  let useCase: GetExampleUseCase;
  let repository: ExampleInMemoryRepository;
  let entity: ExampleEntity;

  beforeAll(async () => {
    repository = new ExampleInMemoryRepository();
    useCase = new GetExampleUseCase(repository);

    entity = ExampleEntity.mock();
    repository.create(entity);
  });

  it('should get a example', async () => {
    const spyInsert = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: entity.id.value });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual(entity.toJSON());
  });
});
