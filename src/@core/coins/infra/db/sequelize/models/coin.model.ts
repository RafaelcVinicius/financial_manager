import { Column, DataType, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';

export type CoinModelType = {
  id?: string;
  value: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

@Table({
  tableName: 'coins',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})
export default class CoinModel extends SequelizeModel<CoinModelType> {
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare value: number;
}
