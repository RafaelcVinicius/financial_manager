import { Column, DataType, HasOne, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';
import FinanceModel from '../../../../../finances/infra/db/sequelize/models/finance.model';

export type CoinModelType = {
  id?: string;
  name: string;
  code: string;
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

  @HasOne(() => FinanceModel)
  declare finance: FinanceModel;
}
