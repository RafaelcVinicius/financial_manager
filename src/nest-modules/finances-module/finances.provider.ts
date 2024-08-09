import { getModelToken } from '@nestjs/sequelize';
import { ApplicationService } from '../../@core/@shared/application/application.service';
import { FinanceRepository } from '../../@core/finances/infra/db/sequelize/repositories/finance.repository';
import { UnitOfWorkSequelize } from '../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import FinanceModel from '../../@core/finances/infra/db/sequelize/models/finance.model';
import { StoreFinanceUseCase } from '../../@core/finances/application/use-case/store/store-finance.use-case';
import { IFinanceRepository } from '../../@core/finances/domain/contracts/finance.interface';

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
};

export const FINANCE_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
