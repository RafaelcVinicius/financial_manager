import { ExampleEntity } from '../../../../domain/entities/example.entity';
import { ExampleInMemoryRepository } from '../../../../infra/db/in-memory/example-in-memory.repository';
import { DeleteExampleUseCase } from '../delete-example.use-case';

describe('DeleteExampleUseCase Unit Tests', () => {
  let useCase: DeleteExampleUseCase;
  let repository: ExampleInMemoryRepository;
  let entity: ExampleEntity;

  beforeAll(async () => {
    repository = new ExampleInMemoryRepository();
    useCase = new DeleteExampleUseCase(repository);

    entity = ExampleEntity.mock();
    repository.create(entity);
  });

  it('should delete a example', async () => {
    const spyInsert = jest.spyOn(repository, 'delete');
    await useCase.execute({ id: entity.id.value });

    const output = await repository.findById(entity.id);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toBeNull();
  });
});
