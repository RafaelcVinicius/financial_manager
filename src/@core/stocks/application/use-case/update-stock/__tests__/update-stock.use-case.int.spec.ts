import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import StockModel from '../../../../infra/db/sequelize/models/stock.model';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { UpdateStockUseCase } from '../update-stock.use-case';
import { StockEntity } from '../../../../domain/entities/stock.entity';
import { StockRepository } from '../../../../infra/db/sequelize/repositories/stock.repository';

describe('UpdateStockUseCase Integration Tests', () => {
  let useCase: UpdateStockUseCase;
  let repository: StockRepository;
  let stockEntity: StockEntity;

  const setup = setupSequelize({ models: [StockModel] });

  beforeEach(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new StockRepository(uow, StockModel);
    useCase = new UpdateStockUseCase(app, repository);

    stockEntity = StockEntity.mock();
    await repository.create(stockEntity);
  });

  it('should update a Stock', async () => {
    await useCase.execute({
      id: stockEntity.id.value,
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
    });

    const model = await repository.findById(stockEntity.id);

    expect(model!.toJSON()).toMatchObject({
      id: stockEntity.id.value,
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
    });
  });
});
