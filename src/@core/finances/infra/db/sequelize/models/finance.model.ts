import { Column, DataType, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';

export type FinanceModelType = {
  id: string;
  value: number;
  description: string;
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
}
