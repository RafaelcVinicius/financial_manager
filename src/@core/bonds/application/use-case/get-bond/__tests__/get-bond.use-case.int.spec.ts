import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { BondEntity } from '../../../../domain/entities/bond.entity';
import BondModel from '../../../../infra/db/sequelize/models/bond.model';
import { BondRepository } from '../../../../infra/db/sequelize/repositories/bond.repository';
import { GetBondUseCase } from '../get-bond.use-case';

describe('GetBondUseCase Integration Tests', () => {
  let useCase: GetBondUseCase;
  let repository: BondRepository;
  let entity: BondEntity;

  const setup = setupSequelize({ models: [BondModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new BondRepository(uow, BondModel);
    useCase = new GetBondUseCase(repository);
  });

  it('should create a Bond', async () => {
    entity = BondEntity.mock();
    repository.create(entity);

    const output = await useCase.execute({ id: entity.id.value });

    expect(output).toStrictEqual({
      ...entity.toJSON(),
      updated_at: output.updated_at,
    });
  });
});
