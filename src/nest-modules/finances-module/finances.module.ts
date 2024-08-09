import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RouterModule } from '@nestjs/core';
import FinanceModel from '../../@core/finances/infra/db/sequelize/models/finance.model';
import { FINANCE_PROVIDERS } from './finances.provider';
import { FinancesController } from './finances.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([FinanceModel]),
    RouterModule.register([
      {
        path: 'finances',
        module: FinancesModule,
      },
    ]),
  ],
  controllers: [FinancesController],
  providers: [
    ...Object.values(FINANCE_PROVIDERS.USE_CASES),
    ...Object.values(FINANCE_PROVIDERS.REPOSITORIES),
  ],
})
export class FinancesModule {}
