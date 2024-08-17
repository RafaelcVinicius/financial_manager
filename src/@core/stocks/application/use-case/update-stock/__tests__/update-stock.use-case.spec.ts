import { ApplicationService } from '../../../../../@shared/application/application.service';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import EventEmitter2 from 'eventemitter2';
import { UpdateStockUseCase } from '../update-stock.use-case';
import { StockInMemoryRepository } from '../../../../infra/db/in-memory/stock-in-memory.repository';
import { StockEntity } from '../../../../domain/entities/stock.entity';

describe('UpdateStockUseCase Unit Tests', () => {
  let useCase: UpdateStockUseCase;
  let repository: StockInMemoryRepository;
  let stockEntity: StockEntity;

  beforeAll(async () => {
    repository = new StockInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    useCase = new UpdateStockUseCase(app, repository);

    stockEntity = StockEntity.mock();
    await repository.create(stockEntity);
  });

  it('should update a fiance', async () => {
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
