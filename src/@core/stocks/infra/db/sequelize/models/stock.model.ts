import { Column, DataType, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';

export type StockModelType = {
  id: string;
  code: string;
  quantity: number;
  unit_price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

@Table({
  tableName: 'stocks',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})
export default class StockModel extends SequelizeModel<StockModelType> {
  @Column({ type: DataType.STRING(10), allowNull: false })
  declare code: string;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare unit_price: number;
}
