import { getModelToken } from '@nestjs/sequelize';
import { ApplicationService } from '../../@core/@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import { BondRepository } from '../../@core/bonds/infra/db/sequelize/repositories/bond.repository';
import BondModel from '../../@core/bonds/infra/db/sequelize/models/bond.model';
import { StoreBondUseCase } from '../../@core/bonds/application/use-case/store-bond/store-bond.use-case';
import { GetBondUseCase } from '../../@core/bonds/application/use-case/get-bond/get-bond.use-case';
import { UpdateBondUseCase } from '../../@core/bonds/application/use-case/update-bond/update-bond.use-case';
import { ListBondUseCase } from '../../@core/bonds/application/use-case/list-bond/list-bond.use-case';

export const REPOSITORIES = {
  BOND_REPOSITORY: {
    provide: 'BondRepository',
    useExisting: BondRepository,
  },
  BOND_SEQUELIZE_REPOSITORY: {
    provide: BondRepository,
    useFactory: (uow: UnitOfWorkSequelize, model: typeof BondModel) => {
      return new BondRepository(uow, model);
    },
    inject: ['UnitOfWork', getModelToken(BondModel)],
  },
};

export const USE_CASES = {
  STORE_BOND_USE_CASE: {
    provide: StoreBondUseCase,
    useFactory: (
      appService: ApplicationService,
      bondRepository: BondRepository
    ) => {
      return new StoreBondUseCase(appService, bondRepository);
    },
    inject: [ApplicationService, REPOSITORIES.BOND_REPOSITORY.provide],
  },

  GET_BOND_USE_CASE: {
    provide: GetBondUseCase,
    useFactory: (bondRepository: BondRepository) => {
      return new GetBondUseCase(bondRepository);
    },
    inject: [REPOSITORIES.BOND_REPOSITORY.provide],
  },

  UPDATE_BOND_USE_CASE: {
    provide: UpdateBondUseCase,
    useFactory: (
      appService: ApplicationService,
      bondRepository: BondRepository
    ) => {
      return new UpdateBondUseCase(appService, bondRepository);
    },
    inject: [ApplicationService, REPOSITORIES.BOND_REPOSITORY.provide],
  },

  LIST_BOND_USE_CASE: {
    provide: ListBondUseCase,
    useFactory: (bondRepository: BondRepository) => {
      return new ListBondUseCase(bondRepository);
    },
    inject: [REPOSITORIES.BOND_REPOSITORY.provide],
  },
};

export const BOND_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
