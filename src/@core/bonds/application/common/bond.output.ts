import { BondEntity } from '../../domain/entities/bond.entity';

export type BondOutput = {
  id: string;
  unit_price: number;
  quantity: number;
  fee: number;
  code: string;
  created_at: Date;
  updated_at: Date;
};

export class BondOutputMapper {
  static toOutput(entity: BondEntity): BondOutput {
    return entity.toJSON();
  }
}
