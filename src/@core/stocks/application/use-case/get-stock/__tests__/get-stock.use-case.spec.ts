import { StockEntity } from '../../../../domain/entities/stock.entity';
import { StockInMemoryRepository } from '../../../../infra/db/in-memory/stock-in-memory.repository';
import { GetStockUseCase } from '../get-stock.use-case';

describe('GetStockUseCase Unit Tests', () => {
  let useCase: GetStockUseCase;
  let repository: StockInMemoryRepository;
  let stockEntity: StockEntity;

  beforeAll(() => {
    repository = new StockInMemoryRepository();
    useCase = new GetStockUseCase(repository);

    stockEntity = StockEntity.mock();
    repository.create(stockEntity);
  });

  it('should create a fiance', async () => {
    const spyInsert = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: stockEntity.id.value });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual(stockEntity.toJSON());
  });
});
