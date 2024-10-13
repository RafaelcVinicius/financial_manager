import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';
import CoinModel from '../../../../../coins/infra/db/sequelize/models/coin.model';

export type FinanceModelType = {
  id: string;
  value: number;
  description: string;
  coin_id: string;
  origem: string;
  origem_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

@Table({
  tableName: 'finances',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})
export default class FinanceModel extends SequelizeModel<FinanceModelType> {
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare value: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare description: string;

  @ForeignKey(() => CoinModel)
  @Column({ type: DataType.UUID, allowNull: false })
  declare coin_id: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  declare origem: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare origem_id: string;

  @BelongsTo(() => CoinModel)
  declare coin: CoinModel;
}
