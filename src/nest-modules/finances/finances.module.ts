import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import FinanceModel from '../../@core/finances/infra/db/sequelize/models/finance.model';
import { FINANCE_PROVIDERS } from './finances.provider';
import { FinancesController } from './finances.controller';

@Module({
  imports: [SequelizeModule.forFeature([FinanceModel])],
  controllers: [FinancesController],
  providers: [
    ...Object.values(FINANCE_PROVIDERS.USE_CASES),
    ...Object.values(FINANCE_PROVIDERS.REPOSITORIES),
  ],
  exports: [FINANCE_PROVIDERS.REPOSITORIES.FINANCE_REPOSITORY.provide],
})
export class FinancesModule {}
