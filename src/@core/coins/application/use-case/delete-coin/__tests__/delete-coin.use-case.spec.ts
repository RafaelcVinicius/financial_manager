import { CoinEntity } from '../../../../domain/entities/coin.entity';
import { CoinInMemoryRepository } from '../../../../infra/db/in-memory/coin-in-memory.repository';
import { DeleteCoinUseCase } from '../delete-coin.use-case';

describe('DeleteCoinUseCase Unit Tests', () => {
  let useCase: DeleteCoinUseCase;
  let repository: CoinInMemoryRepository;
  let entity: CoinEntity;

  beforeAll(async () => {
    repository = new CoinInMemoryRepository();
    useCase = new DeleteCoinUseCase(repository);

    entity = CoinEntity.mock();
    repository.create(entity);
  });

  it('should delete a coin', async () => {
    const spyInsert = jest.spyOn(repository, 'delete');
    await useCase.execute({ id: entity.id.value });

    const output = await repository.findById(entity.id);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toBeNull();
  });
});
