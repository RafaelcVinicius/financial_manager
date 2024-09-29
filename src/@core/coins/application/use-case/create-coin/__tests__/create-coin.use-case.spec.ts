import EventEmitter2 from 'eventemitter2';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { CoinInMemoryRepository } from '../../../../infra/db/in-memory/coin-in-memory.repository';
import { CreateCoinUseCase } from '../create-coin.use-case';
import { ApplicationService } from '../../../../../@shared/application/application.service';

describe('CreateCoinUseCase Unit Tests', () => {
  let useCase: CreateCoinUseCase;
  let repository: CoinInMemoryRepository;

  beforeEach(() => {
    repository = new CoinInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);
    useCase = new CreateCoinUseCase(app, repository);
  });

  it('should create a coins', async () => {
    const spyInsert = jest.spyOn(repository, 'create');
    let output = await useCase.execute({ value: 321 });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id.value,
      value: 321,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });

    output = await useCase.execute({
      value: 852,
    });

    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id.value,
      value: 852,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
    });
  });
});
