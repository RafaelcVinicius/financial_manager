import { CoinEntity } from '../../../../domain/entities/coin.entity';
import { CoinInMemoryRepository } from '../../../../infra/db/in-memory/coin-in-memory.repository';
import { GetCoinUseCase } from '../get-coin.use-case';

describe('GetCoinUseCase Unit Tests', () => {
  let useCase: GetCoinUseCase;
  let repository: CoinInMemoryRepository;
  let entity: CoinEntity;

  beforeAll(async () => {
    repository = new CoinInMemoryRepository();
    useCase = new GetCoinUseCase(repository);

    entity = CoinEntity.mock();
    repository.create(entity);
  });

  it('should get a coin', async () => {
    const spyInsert = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: entity.id.value });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual(entity.toJSON());
  });
});
