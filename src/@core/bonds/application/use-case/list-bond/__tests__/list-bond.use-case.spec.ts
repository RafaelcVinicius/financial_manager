import { BondEntity } from '../../../../domain/entities/bond.entity';
import { BondInMemoryRepository } from '../../../../infra/db/in-memory/bond-in-memory.repository';
import { ListBondUseCase } from '../list-bond.use-case';

describe('ListBondUseCase Unit Tests', () => {
  let useCase: ListBondUseCase;
  let repository: BondInMemoryRepository;
  let entity: BondEntity;

  beforeAll(async () => {
    repository = new BondInMemoryRepository();
    useCase = new ListBondUseCase(repository);

    entity = BondEntity.mock();
    repository.create(entity);
  });

  it('should list a bonds', async () => {
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
