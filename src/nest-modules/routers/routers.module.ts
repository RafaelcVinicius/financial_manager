import { Global, Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { FinancesModule } from '../finances/finances.module';
import { StocksModule } from '../stocks/stock.module';
import { BondsModule } from '../bonds/bonds.module';

@Global()
@Module({})
export class RoutersModule extends NestRouterModule {
  static register() {
    return super.register([
      {
        path: 'v1',
        children: [
          {
            path: 'finances',
            module: FinancesModule,
          },
          {
            path: 'stocks',
            module: StocksModule,
          },
          {
            path: 'bonds',
            module: BondsModule,
          },
        ],
      },
    ]);
  }
}
