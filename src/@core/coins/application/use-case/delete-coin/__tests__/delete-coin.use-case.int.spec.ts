import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { CoinEntity } from '../../../../domain/entities/coin.entity';
import CoinModel from '../../../../infra/db/sequelize/models/coin.model';
import { CoinRepository } from '../../../../infra/db/sequelize/repositories/coin.repository';
import { GetCoinUseCase } from '../../get-coin/get-coin.use-case';

describe('GetCoinUseCase Integration Tests', () => {
  let useCase: GetCoinUseCase;
  let repository: CoinRepository;
  let entity: CoinEntity;

  const setup = setupSequelize({ models: [CoinModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new CoinRepository(uow, CoinModel);
    useCase = new GetCoinUseCase(repository);
  });

  it('should create a Coin', async () => {
    entity = CoinEntity.mock();
    repository.create(entity);

    const output = await useCase.execute({ id: entity.id.value });

    expect(output).toStrictEqual({
      ...entity.toJSON(),
      updated_at: output.updated_at,
    });
  });
});
