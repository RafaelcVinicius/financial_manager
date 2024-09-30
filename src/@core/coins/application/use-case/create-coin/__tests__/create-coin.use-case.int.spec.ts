import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import CoinModel from '../../../../infra/db/sequelize/models/coin.model';
import { CoinRepository } from '../../../../infra/db/sequelize/repositories/coin.repository';
import { CreateCoinUseCase } from '../create-coin.use-case';

describe('CreateCoinUseCase Integration Tests', () => {
  let useCase: CreateCoinUseCase;
  let repository: CoinRepository;

  const setup = setupSequelize({ models: [CoinModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new CoinRepository(uow, CoinModel);
    useCase = new CreateCoinUseCase(app, repository);
  });

  it('should create a coin', async () => {
    let output = await useCase.execute({
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.789456,
      unit_price: 90000,
    });
    let entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity!.id.value,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.789456,
      unit_price: 90000,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.123456,
      unit_price: 90000,
    });

    entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity!.id.value,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.123456,
      unit_price: 90000,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.852963,
      unit_price: 90000,
    });

    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.id.value,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.852963,
      unit_price: 90000,
      created_at: undefined,
      updated_at: undefined,
    });
  });
});
