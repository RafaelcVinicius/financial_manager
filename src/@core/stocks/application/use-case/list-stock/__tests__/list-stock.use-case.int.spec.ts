import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { StockEntity } from '../../../../domain/entities/stock.entity';
import StockModel from '../../../../infra/db/sequelize/models/stock.model';
import { StockRepository } from '../../../../infra/db/sequelize/repositories/stock.repository';
import { ListStockUseCase } from '../list-stock.use-case';

describe('ListStockUseCase Unit Tests', () => {
  let useCase: ListStockUseCase;
  let repository: StockRepository;
  let stockEntity: StockEntity;

  const setup = setupSequelize({ models: [StockModel] });

  beforeEach(() => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new StockRepository(uow, StockModel);
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
      items: [
        { ...stockEntity.toJSON(), updated_at: output.items[0].updated_at },
      ],
    });
  });
});
