import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { BondEntity } from '../../../../domain/entities/bond.entity';
import BondModel from '../../../../infra/db/sequelize/models/bond.model';
import { BondRepository } from '../../../../infra/db/sequelize/repositories/bond.repository';
import { ListBondUseCase } from '../list-bond.use-case';

describe('ListBondUseCase Unit Tests', () => {
  let useCase: ListBondUseCase;
  let repository: BondRepository;
  let entity: BondEntity;

  const setup = setupSequelize({ models: [BondModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new BondRepository(uow, BondModel);
    useCase = new ListBondUseCase(repository);
  });

  it('should list a bonds', async () => {
    entity = BondEntity.mock();
    repository.create(entity);

    const spyInsert = jest.spyOn(repository, 'search');
    const output = await useCase.execute({});

    expect(spyInsert).toHaveBeenCalledTimes(1);
    await expect(output).toStrictEqual({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 1,
      items: [{ ...entity.toJSON(), updated_at: output.items[0].updated_at }],
    });
  });
});
