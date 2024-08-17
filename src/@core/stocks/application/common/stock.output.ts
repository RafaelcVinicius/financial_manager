import { StockEntity } from '../../domain/entities/stock.entity';

export type StockOutput = {
  id: string;
  code: string;
  quantity: number;
  unit_price: number;
  created_at: Date;
  updated_at: Date;
};

export class StockOutputMapper {
  static toOutput(entity: StockEntity): StockOutput {
    return entity.toJSON();
  }
}
