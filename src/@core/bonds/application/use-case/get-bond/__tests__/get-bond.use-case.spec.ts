import { BondEntity } from '../../../../domain/entities/bond.entity';
import { BondInMemoryRepository } from '../../../../infra/db/in-memory/bond-in-memory.repository';
import { GetBondUseCase } from '../get-bond.use-case';

describe('GetBondUseCase Unit Tests', () => {
  let useCase: GetBondUseCase;
  let repository: BondInMemoryRepository;
  let entity: BondEntity;

  beforeAll(async () => {
    repository = new BondInMemoryRepository();
    useCase = new GetBondUseCase(repository);

    entity = BondEntity.mock();
    repository.create(entity);
  });

  it('should get a bond', async () => {
    const spyInsert = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: entity.id.value });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual(entity.toJSON());
  });
});
