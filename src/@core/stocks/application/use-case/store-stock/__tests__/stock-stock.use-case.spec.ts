import EventEmitter2 from 'eventemitter2';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { StoreStockUseCase } from '../stock-stock.use-case';
import { StockInMemoryRepository } from '../../../../infra/db/in-memory/stock-in-memory.repository';

describe('StoreStockUseCase Unit Tests', () => {
  let useCase: StoreStockUseCase;
  let repository: StockInMemoryRepository;

  beforeEach(() => {
    repository = new StockInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);
    useCase = new StoreStockUseCase(app, repository);
  });

  it('should create a fiance', async () => {
    const spyInsert = jest.spyOn(repository, 'create');
    let output = await useCase.execute({
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id.value,
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });

    output = await useCase.execute({
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
    });

    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id.value,
      code: 'visc11',
      quantity: 321,
      unit_price: 55.4,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
    });
  });
});
