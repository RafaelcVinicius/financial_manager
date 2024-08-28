import { Column, DataType, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';

export type ExampleModelType = {
  id?: string;
  value: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

@Table({
  tableName: 'examples',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})
export default class ExampleModel extends SequelizeModel<ExampleModelType> {
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare value: number;
}
