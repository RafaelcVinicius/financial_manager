import { CoinEntity } from '../../domain/entities/coin.entity';

export type CoinOutput = {
  id: string;
  value: number;
  created_at: Date;
  updated_at: Date;
};

export class CoinOutputMapper {
  static toOutput(entity: CoinEntity): CoinOutput {
    return entity.toJSON();
  }
}
