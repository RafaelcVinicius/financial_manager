import { CoinEntity } from '../../domain/entities/coin.entity';

export type CoinOutput = {
  id: string;
  name: string;
  code: string;
  quantity: number;
  unit_price: number;
  created_at: Date;
  updated_at: Date;
};

export class CoinOutputMapper {
  static toOutput(entity: CoinEntity): CoinOutput {
    return entity.toJSON();
  }
}
