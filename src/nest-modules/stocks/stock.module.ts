import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { STOCK_PROVIDERS } from './stock.provider';
import { StockController } from './stock.controller';
import StockModel from '../../@core/stocks/infra/db/sequelize/models/stock.model';

@Module({
  imports: [SequelizeModule.forFeature([StockModel])],
  controllers: [StockController],
  providers: [
    ...Object.values(STOCK_PROVIDERS.USE_CASES),
    ...Object.values(STOCK_PROVIDERS.REPOSITORIES),
  ],
  exports: [STOCK_PROVIDERS.REPOSITORIES.STOCK_REPOSITORY.provide],
})
export class StocksModule {}
