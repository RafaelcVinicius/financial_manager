import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { CoinEntity } from '../../../../domain/entities/coin.entity';
import CoinModel from '../../../../infra/db/sequelize/models/coin.model';
import { CoinRepository } from '../../../../infra/db/sequelize/repositories/coin.repository';
import { ListCoinsUseCase } from '../list-coin.use-case';

describe('ListCoinUseCase Unit Tests', () => {
  let useCase: ListCoinsUseCase;
  let repository: CoinRepository;
  let entity: CoinEntity;

  const setup = setupSequelize({ models: [CoinModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new CoinRepository(uow, CoinModel);
    useCase = new ListCoinsUseCase(repository);
  });

  it('should list a coins', async () => {
    entity = CoinEntity.mock();
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
