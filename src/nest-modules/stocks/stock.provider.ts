import { getModelToken } from '@nestjs/sequelize';
import { ApplicationService } from '../../@core/@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import { StockRepository } from '../../@core/stocks/infra/db/sequelize/repositories/stock.repository';
import StockModel from '../../@core/stocks/infra/db/sequelize/models/stock.model';
import { StoreStockUseCase } from '../../@core/stocks/application/use-case/store-stock/store-stock.use-case';
import { IStockRepository } from '../../@core/stocks/domain/contracts/stock.interface';
import { GetStockUseCase } from '../../@core/stocks/application/use-case/get-stock/get-stock.use-case';
import { UpdateStockUseCase } from '../../@core/stocks/application/use-case/update-stock/update-stock.use-case';
import { ListStockUseCase } from '../../@core/stocks/application/use-case/list-stock/list-stock.use-case';

export const REPOSITORIES = {
  STOCK_REPOSITORY: {
    provide: 'StockRepository',
    useExisting: StockRepository,
  },
  STOCK_SEQUELIZE_REPOSITORY: {
    provide: StockRepository,
    useFactory: (uow: UnitOfWorkSequelize, stockModel: typeof StockModel) => {
      return new StockRepository(uow, stockModel);
    },
    inject: ['UnitOfWork', getModelToken(StockModel)],
  },
};

export const USE_CASES = {
  STORE_STOCK_USE_CASE: {
    provide: StoreStockUseCase,
    useFactory: (
      appService: ApplicationService,
      stockRepository: IStockRepository
    ) => {
      return new StoreStockUseCase(appService, stockRepository);
    },
    inject: [ApplicationService, REPOSITORIES.STOCK_REPOSITORY.provide],
  },

  GET_STOCK_USE_CASE: {
    provide: GetStockUseCase,
    useFactory: (stockRepository: IStockRepository) => {
      return new GetStockUseCase(stockRepository);
    },
    inject: [REPOSITORIES.STOCK_REPOSITORY.provide],
  },

  UPDATE_STOCK_USE_CASE: {
    provide: UpdateStockUseCase,
    useFactory: (
      appService: ApplicationService,
      stockRepository: IStockRepository
    ) => {
      return new UpdateStockUseCase(appService, stockRepository);
    },
    inject: [ApplicationService, REPOSITORIES.STOCK_REPOSITORY.provide],
  },

  LIST_STOCK_USE_CASE: {
    provide: ListStockUseCase,
    useFactory: (StockRepository: IStockRepository) => {
      return new ListStockUseCase(StockRepository);
    },
    inject: [REPOSITORIES.STOCK_REPOSITORY.provide],
  },
};

export const STOCK_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
