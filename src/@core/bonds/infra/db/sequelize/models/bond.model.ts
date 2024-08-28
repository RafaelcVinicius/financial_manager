import { Column, DataType, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';

export type BondModelType = {
  id?: string;
  unit_price: number;
  code: string;
  quantity: number;
  fee: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

@Table({
  tableName: 'bonds',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})
export default class BondModel extends SequelizeModel<BondModelType> {
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare unit_price: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare fee: number;

  @Column({ type: DataType.STRING(5), allowNull: false })
  declare code: string;
}
