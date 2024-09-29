import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { COIN_PROVIDERS } from './coins.provider';
import CoinModel from '../../@core/coins/infra/db/sequelize/models/coin.model';
import { CoinsController } from './coins.controller';

@Module({
  imports: [SequelizeModule.forFeature([CoinModel])],
  controllers: [CoinsController],
  providers: [
    ...Object.values(COIN_PROVIDERS.USE_CASES),
    ...Object.values(COIN_PROVIDERS.REPOSITORIES),
  ],
  exports: [COIN_PROVIDERS.REPOSITORIES.COIN_REPOSITORY.provide],
})
export class CoinsModule {}
