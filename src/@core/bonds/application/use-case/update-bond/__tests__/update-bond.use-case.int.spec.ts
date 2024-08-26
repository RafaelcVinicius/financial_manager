import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { BondEntity } from '../../../../domain/entities/bond.entity';
import BondModel from '../../../../infra/db/sequelize/models/bond.model';
import { BondRepository } from '../../../../infra/db/sequelize/repositories/bond.repository';
import { UpdateBondUseCase } from '../update-bond.use-case';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';

describe('UpdateBondUseCase Integration Tests', () => {
  let useCase: UpdateBondUseCase;
  let repository: BondRepository;
  let entity: BondEntity;

  const setup = setupSequelize({ models: [BondModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new BondRepository(uow, BondModel);
    useCase = new UpdateBondUseCase(app, repository);
  });

  it('should update a bond', async () => {
    entity = BondEntity.mock();
    await repository.create(entity);

    await useCase.execute({
      id: entity.id.value,
      value: 10,
    });

    const model = await repository.findById(entity.id);

    expect(model!.toJSON()).toMatchObject({
      id: entity.id.value,
      value: 10,
    });
  });
});
