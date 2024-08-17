import { getModelToken } from '@nestjs/sequelize';
import { ApplicationService } from '../../@core/@shared/application/application.service';
import { FinanceRepository } from '../../@core/finances/infra/db/sequelize/repositories/finance.repository';
import { UnitOfWorkSequelize } from '../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import FinanceModel from '../../@core/finances/infra/db/sequelize/models/finance.model';
import { StoreFinanceUseCase } from '../../@core/finances/application/use-case/create-finance/store-finance.use-case';
import { IFinanceRepository } from '../../@core/finances/domain/contracts/finance.interface';
import { ListFinanceUseCase } from '../../@core/finances/application/use-case/list-finance/list-finance.use-case';
import { GetFinanceUseCase } from '../../@core/finances/application/use-case/get-finance/get-finance.use-case';
import { UpdateFinanceUseCase } from '../../@core/finances/application/use-case/update-finance/update-finance.use-case';

export const REPOSITORIES = {
  FINANCE_REPOSITORY: {
    provide: 'FinanceRepository',
    useExisting: FinanceRepository,
  },
  FINANCE_SEQUELIZE_REPOSITORY: {
    provide: FinanceRepository,
    useFactory: (
      uow: UnitOfWorkSequelize,
      financeModel: typeof FinanceModel
    ) => {
      return new FinanceRepository(uow, financeModel);
    },
    inject: ['UnitOfWork', getModelToken(FinanceModel)],
  },
};

export const USE_CASES = {
  STORE_FINANCE_USE_CASE: {
    provide: StoreFinanceUseCase,
    useFactory: (
      appService: ApplicationService,
      financeRepository: IFinanceRepository
    ) => {
      return new StoreFinanceUseCase(appService, financeRepository);
    },
    inject: [ApplicationService, REPOSITORIES.FINANCE_REPOSITORY.provide],
  },

  GET_FINANCE_USE_CASE: {
    provide: GetFinanceUseCase,
    useFactory: (financeRepository: IFinanceRepository) => {
      return new GetFinanceUseCase(financeRepository);
    },
    inject: [REPOSITORIES.FINANCE_REPOSITORY.provide],
  },

  UPDATE_FINANCE_USE_CASE: {
    provide: UpdateFinanceUseCase,
    useFactory: (
      appService: ApplicationService,
      financeRepository: IFinanceRepository
    ) => {
      return new UpdateFinanceUseCase(appService, financeRepository);
    },
    inject: [ApplicationService, REPOSITORIES.FINANCE_REPOSITORY.provide],
  },

  LIST_FINANCE_USE_CASE: {
    provide: ListFinanceUseCase,
    useFactory: (financeRepository: IFinanceRepository) => {
      return new ListFinanceUseCase(financeRepository);
    },
    inject: [REPOSITORIES.FINANCE_REPOSITORY.provide],
  },
};

export const FINANCE_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
