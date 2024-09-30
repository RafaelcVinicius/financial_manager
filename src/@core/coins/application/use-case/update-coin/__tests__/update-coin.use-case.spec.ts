import { ApplicationService } from '../../../../../@shared/application/application.service';
import { CoinEntity } from '../../../../domain/entities/coin.entity';
import { CoinInMemoryRepository } from '../../../../infra/db/in-memory/coin-in-memory.repository';
import { UpdateCoinUseCase } from '../update-coin.use-case';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import EventEmitter2 from 'eventemitter2';

describe('UpdateCoinUseCase Unit Tests', () => {
  let useCase: UpdateCoinUseCase;
  let repository: CoinInMemoryRepository;
  let entity: CoinEntity;

  beforeAll(async () => {
    repository = new CoinInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    useCase = new UpdateCoinUseCase(app, repository);

    entity = CoinEntity.mock();
    await repository.create(entity);
  });

  it('should update a coin', async () => {
    await useCase.execute({
      id: entity.id.value,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 1.789456,
      unit_price: 15000,
    });

    const model = await repository.findById(entity.id);

    expect(model!.toJSON()).toMatchObject({
      id: entity.id.value,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 1.789456,
      unit_price: 15000,
    });
  });
});
