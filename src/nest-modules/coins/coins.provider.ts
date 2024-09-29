import { getModelToken } from '@nestjs/sequelize';
import { ApplicationService } from '../../@core/@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import { CoinRepository } from '../../@core/coins/infra/db/sequelize/repositories/coin.repository';
import CoinModel from '../../@core/coins/infra/db/sequelize/models/coin.model';
import { CreateCoinUseCase } from '../../@core/coins/application/use-case/create-coin/create-coin.use-case';
import { GetCoinUseCase } from '../../@core/coins/application/use-case/get-coin/get-coin.use-case';
import { UpdateCoinUseCase } from '../../@core/coins/application/use-case/update-coin/update-coin.use-case';
import { ListCoinsUseCase } from '../../@core/coins/application/use-case/list-coin/list-coin.use-case';
import { DeleteCoinUseCase } from '../../@core/coins/application/use-case/delete-coin/delete-coin.use-case';

export const REPOSITORIES = {
  COIN_REPOSITORY: {
    provide: 'CoinRepository',
    useExisting: CoinRepository,
  },
  COIN_SEQUELIZE_REPOSITORY: {
    provide: CoinRepository,
    useFactory: (uow: UnitOfWorkSequelize, model: typeof CoinModel) => {
      return new CoinRepository(uow, model);
    },
    inject: ['UnitOfWork', getModelToken(CoinModel)],
  },
};

export const USE_CASES = {
  CREATE_COIN_USE_CASE: {
    provide: CreateCoinUseCase,
    useFactory: (
      appService: ApplicationService,
      coinRepository: CoinRepository
    ) => {
      return new CreateCoinUseCase(appService, coinRepository);
    },
    inject: [ApplicationService, REPOSITORIES.COIN_REPOSITORY.provide],
  },

  GET_COIN_USE_CASE: {
    provide: GetCoinUseCase,
    useFactory: (coinRepository: CoinRepository) => {
      return new GetCoinUseCase(coinRepository);
    },
    inject: [REPOSITORIES.COIN_REPOSITORY.provide],
  },

  UPDATE_COIN_USE_CASE: {
    provide: UpdateCoinUseCase,
    useFactory: (
      appService: ApplicationService,
      coinRepository: CoinRepository
    ) => {
      return new UpdateCoinUseCase(appService, coinRepository);
    },
    inject: [ApplicationService, REPOSITORIES.COIN_REPOSITORY.provide],
  },

  LIST_COIN_USE_CASE: {
    provide: ListCoinsUseCase,
    useFactory: (coinRepository: CoinRepository) => {
      return new ListCoinsUseCase(coinRepository);
    },
    inject: [REPOSITORIES.COIN_REPOSITORY.provide],
  },

  DELETE_COIN_USE_CASE: {
    provide: DeleteCoinUseCase,
    useFactory: (coinRepository: CoinRepository) => {
      return new DeleteCoinUseCase(coinRepository);
    },
    inject: [REPOSITORIES.COIN_REPOSITORY.provide],
  },
};

export const COIN_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
