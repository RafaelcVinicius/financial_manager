import { Test, TestingModule } from '@nestjs/testing';
import { CoinsController } from '../coins.controller';
import { CoinsModule } from '../coins.module';
import { COIN_PROVIDERS } from '../coins.provider';
import { DeleteCoinUseCase } from '../../../@core/coins/application/use-case/delete-coin/delete-coin.use-case';
import { CreateCoinFixture, UpdateCoinFixture } from '../testing/coin-fixture';
import { Uuid } from '../../../@core/@shared/domain/value-objects/uuid.vo';
import { CoinOutputMapper } from '../../../@core/coins/application/common/coin.output';
import { CoinPresenter } from '../coins.presenter';
import { CoinEntity } from '../../../@core/coins/domain/entities/coin.entity';
import { DatabaseModule } from '../../database/database.module';
import { UpdateCoinUseCase } from '../../../@core/coins/application/use-case/update-coin/update-coin.use-case';
import { ListCoinsUseCase } from '../../../@core/coins/application/use-case/list-coin/list-coin.use-case';
import { GetCoinUseCase } from '../../../@core/coins/application/use-case/get-coin/get-coin.use-case';
import { SharedModule } from '../../shared/shared.module';
import { ICoinRepository } from '../../../@core/coins/domain/contracts/coin.interface';
import { EventsModule } from '../../events/events.module';
import { getConnectionToken } from '@nestjs/sequelize';
import { UnitOfWorkSequelize } from '../../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import { ConfigModule } from '../../config/config.module';
import { Sequelize } from 'sequelize';
import { CreateCoinUseCase } from '../../../@core/coins/application/use-case/create-coin/create-coin.use-case';

describe('CoinsController Integration Tests', () => {
  let controller: CoinsController;
  let repository: ICoinRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        SharedModule,
        EventsModule,
        CoinsModule,
      ],
    })
      .overrideProvider('UnitOfWork')
      .useFactory({
        factory: (sequelize: Sequelize) => {
          return new UnitOfWorkSequelize(sequelize);
        },
        inject: [getConnectionToken()],
      })
      .compile();

    controller = module.get<CoinsController>(CoinsController);

    repository = module.get<ICoinRepository>(
      COIN_PROVIDERS.REPOSITORIES.COIN_REPOSITORY.provide
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateCoinUseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateCoinUseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListCoinsUseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetCoinUseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteCoinUseCase);
  });

  describe('should create a coin', () => {
    const arrange = CreateCoinFixture.arrangeForCreate();
    test.each(arrange)('when body is $send_data', async ({ send_data }) => {
      const presenter = await controller.create(send_data);
      const entity = await repository.findById(new Uuid(presenter.id));

      entity.created_at = undefined;
      entity.updated_at = undefined;

      expect(entity!.toJSON()).toMatchObject({
        id: presenter.id,
        name: presenter.name,
        code: presenter.code,
        quantity: presenter.quantity,
        unit_price: presenter.unit_price,
        created_at: presenter.created_at,
        updated_at: presenter.updated_at,
      });

      const output = CoinOutputMapper.toOutput(entity!);
      expect(presenter).toEqual(new CoinPresenter(output));
    });
  });

  describe('should update a coin', () => {
    const arrange = UpdateCoinFixture.arrangeForUpdate();

    const entityMock = CoinEntity.mock();

    beforeEach(async () => {
      await repository.create(entityMock);
    });

    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.update(
          entityMock.id.value,
          send_data
        );

        const entity = await repository.findById(new Uuid(presenter.id));
        entity.updated_at = presenter.updated_at;

        expect(entity!.toJSON()).toStrictEqual({
          id: presenter.id,
          created_at: presenter.created_at,
          updated_at: presenter.updated_at,
          name: expected.name ?? entityMock.name,
          code: expected.code ?? entityMock.code,
          quantity: expected.quantity ?? entityMock.quantity,
          unit_price: expected.unit_price ?? entityMock.unit_price,
        });
        const output = CoinOutputMapper.toOutput(entity!);
        expect(presenter).toEqual(new CoinPresenter(output));
      }
    );
  });

  it('should delete a coin', async () => {
    try {
      const entity = CoinEntity.mock();
      await repository.create(entity);
      const response = await controller.delete(entity.id.value);
      expect(response).not.toBeDefined();
      await expect(repository.findById(entity.id.value)).resolves.toBeNull();
    } catch (error) {
      console.log(error);
    }
  });

  it('should get a coin', async () => {
    const entity = CoinEntity.mock();
    await repository.create(entity);
    const presenter = await controller.get(entity.id.value);

    expect(presenter.id).toBe(entity.id.value);
    expect(presenter.name).toBe(entity.name);
    expect(presenter.code).toBe(entity.code);
    expect(presenter.quantity).toBe(entity.quantity);
    expect(presenter.unit_price).toBe(entity.unit_price);
    expect(presenter.created_at).toStrictEqual(entity.created_at);
  });
});
