import { CoinEntity } from '../../../../domain/entities/coin.entity';
import { CoinInMemoryRepository } from '../../../../infra/db/in-memory/coin-in-memory.repository';
import { ListCoinsUseCase } from '../list-coin.use-case';

describe('ListCoinUseCase Unit Tests', () => {
  let useCase: ListCoinsUseCase;
  let repository: CoinInMemoryRepository;
  let entity: CoinEntity;

  beforeAll(async () => {
    repository = new CoinInMemoryRepository();
    useCase = new ListCoinsUseCase(repository);

    entity = CoinEntity.mock();
    repository.create(entity);
  });

  it('should list a coins', async () => {
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
