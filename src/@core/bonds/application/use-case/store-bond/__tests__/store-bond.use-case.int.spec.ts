import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import BondModel from '../../../../infra/db/sequelize/models/bond.model';
import { BondRepository } from '../../../../infra/db/sequelize/repositories/bond.repository';
import { StoreBondUseCase } from '../store-bond.use-case';

describe('StoreBondUseCase Integration Tests', () => {
  let useCase: StoreBondUseCase;
  let repository: BondRepository;

  const setup = setupSequelize({ models: [BondModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new BondRepository(uow, BondModel);
    useCase = new StoreBondUseCase(app, repository);
  });

  it('should create a bond', async () => {
    let output = await useCase.execute({
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
    });
    let entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity!.id.value,
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
    });

    entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity!.id.value,
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.id.value,
      unit_price: 1500,
      quantity: 0.5,
      code: 'LTF',
      fee: 0.18,
      created_at: undefined,
      updated_at: undefined,
    });
  });
});
