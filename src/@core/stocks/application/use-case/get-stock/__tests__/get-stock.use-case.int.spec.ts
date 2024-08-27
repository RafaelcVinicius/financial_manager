import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { StockEntity } from '../../../../domain/entities/stock.entity';
import StockModel from '../../../../infra/db/sequelize/models/stock.model';
import { StockRepository } from '../../../../infra/db/sequelize/repositories/stock.repository';
import { GetStockUseCase } from '../get-stock.use-case';

describe('GetFinanceUseCase Integration Tests', () => {
  let useCase: GetStockUseCase;
  let repository: StockRepository;
  let stockEntity: StockEntity;

  const setup = setupSequelize({ models: [StockModel] });

  beforeEach(() => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new StockRepository(uow, StockModel);
    useCase = new GetStockUseCase(repository);

    stockEntity = StockEntity.mock();
    repository.create(stockEntity);
  });

  it('should create a Stock', async () => {
    const output = await useCase.execute({ id: stockEntity.id.value });

    expect(output).toStrictEqual({
      ...stockEntity.toJSON(),
      updated_at: output.updated_at,
    });
  });
});
