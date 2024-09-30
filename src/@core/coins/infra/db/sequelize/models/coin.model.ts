import { Column, DataType, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';

export type CoinModelType = {
  id?: string;
  name: string;
  code: string;
  quantity: number;
  unit_price: number;
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
  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(8), allowNull: false })
  code: string;

  @Column({ type: DataType.DECIMAL(20, 8), allowNull: false })
  quantity: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  unit_price: number;
}
