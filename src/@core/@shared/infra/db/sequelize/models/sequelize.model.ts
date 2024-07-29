import { Column, DataType, Model } from 'sequelize-typescript';

export default class SequelizeModel<TModel = null> extends Model<TModel> {
  @Column({ type: DataType.UUID, allowNull: false, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare updated_at?: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare deleted_at?: Date;
}
