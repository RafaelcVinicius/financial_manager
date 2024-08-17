import { StockEntity } from '../../../../domain/entities/stock.entity';
import { StockInMemoryRepository } from '../../../../infra/db/in-memory/stock-in-memory.repository';
import { ListStockUseCase } from '../list-stock.use-case';

describe('ListstockUseCase Unit Tests', () => {
  let useCase: ListStockUseCase;
  let repository: StockInMemoryRepository;
  let stockEntity: StockEntity;

  beforeAll(() => {
    repository = new StockInMemoryRepository();
    useCase = new ListStockUseCase(repository);

    stockEntity = StockEntity.mock();
    repository.create(stockEntity);
  });

  it('should create a fiance', async () => {
    const spyInsert = jest.spyOn(repository, 'search');
    const output = await useCase.execute({});

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 1,
      items: [stockEntity.toJSON()],
    });
  });
});
