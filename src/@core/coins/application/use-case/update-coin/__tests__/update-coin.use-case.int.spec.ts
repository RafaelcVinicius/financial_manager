import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { CoinEntity } from '../../../../domain/entities/coin.entity';
import CoinModel from '../../../../infra/db/sequelize/models/coin.model';
import { CoinRepository } from '../../../../infra/db/sequelize/repositories/coin.repository';
import { UpdateCoinUseCase } from '../update-coin.use-case';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';

describe('UpdateCoinUseCase Integration Tests', () => {
  let useCase: UpdateCoinUseCase;
  let repository: CoinRepository;
  let entity: CoinEntity;

  const setup = setupSequelize({ models: [CoinModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new CoinRepository(uow, CoinModel);
    useCase = new UpdateCoinUseCase(app, repository);
  });

  it('should update a coin', async () => {
    entity = CoinEntity.mock();
    await repository.create(entity);

    await useCase.execute({
      id: entity.id.value,
      code: 'EHT',
    });

    const model = await repository.findById(entity.id);

    expect(model!.toJSON()).toMatchObject({
      id: entity.id.value,
      name: entity.name,
      code: 'EHT',
      quantity: entity.quantity,
      unit_price: entity.unit_price,
    });
  });
});
