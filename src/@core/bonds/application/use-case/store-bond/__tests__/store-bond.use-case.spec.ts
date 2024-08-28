import EventEmitter2 from 'eventemitter2';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { BondInMemoryRepository } from '../../../../infra/db/in-memory/bond-in-memory.repository';
import { StoreBondUseCase } from '../store-bond.use-case';
import { ApplicationService } from '../../../../../@shared/application/application.service';

describe('StoreBondUseCase Unit Tests', () => {
  let useCase: StoreBondUseCase;
  let repository: BondInMemoryRepository;

  beforeEach(() => {
    repository = new BondInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);
    useCase = new StoreBondUseCase(app, repository);
  });

  it('should create a bonds', async () => {
    const spyInsert = jest.spyOn(repository, 'create');
    let output = await useCase.execute({
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id.value,
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });

    output = await useCase.execute({
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
    });

    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id.value,
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
    });
  });
});
