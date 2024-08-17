import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import StockModel from '../../../../infra/db/sequelize/models/stock.model';
import { StockRepository } from '../../../../infra/db/sequelize/repositories/stock.repository';
import { StoreStockUseCase } from '../stock-stock.use-case';

describe('StoreStockUseCase Integration Tests', () => {
  let useCase: StoreStockUseCase;
  let repository: StockRepository;

  const setup = setupSequelize({ models: [StockModel] });

  beforeAll(() => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new StockRepository(uow, StockModel);
    useCase = new StoreStockUseCase(app, repository);
  });

  it('should create a Stock', async () => {
    let output = await useCase.execute({
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
    });
    let entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity!.id.value,
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
    });

    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.id.value,
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
    });

    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.id.value,
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
      created_at: undefined,
      updated_at: undefined,
    });
  });
});
