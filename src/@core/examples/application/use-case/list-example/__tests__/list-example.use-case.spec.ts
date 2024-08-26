import { ExampleEntity } from '../../../../domain/entities/example.entity';
import { ExampleInMemoryRepository } from '../../../../infra/db/in-memory/example-in-memory.repository';
import { ListExampleUseCase } from '../list-example.use-case';

describe('ListExampleUseCase Unit Tests', () => {
  let useCase: ListExampleUseCase;
  let repository: ExampleInMemoryRepository;
  let entity: ExampleEntity;

  beforeAll(async () => {
    repository = new ExampleInMemoryRepository();
    useCase = new ListExampleUseCase(repository);

    entity = ExampleEntity.mock();
    repository.create(entity);
  });

  it('should list a examples', async () => {
    const spyInsert = jest.spyOn(repository, 'search');
    const output = await useCase.execute({});

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 1,
      items: [entity.toJSON()],
    });
  });
});
