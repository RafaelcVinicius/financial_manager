import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BOND_PROVIDERS } from './bonds.provider';
import BondModel from '../../@core/bonds/infra/db/sequelize/models/bond.model';
import { BondController } from './bonds.controller';

@Module({
  imports: [SequelizeModule.forFeature([BondModel])],
  controllers: [BondController],
  providers: [
    ...Object.values(BOND_PROVIDERS.USE_CASES),
    ...Object.values(BOND_PROVIDERS.REPOSITORIES),
  ],
  exports: [BOND_PROVIDERS.REPOSITORIES.BOND_REPOSITORY.provide],
})
export class BondsModule {}
