import { BondEntity } from '../../domain/entities/bond.entity';

export type BondOutput = {
  id: string;
  value: number;
  created_at: Date;
  updated_at: Date;
};

export class BondOutputMapper {
  static toOutput(entity: BondEntity): BondOutput {
    return entity.toJSON();
  }
}
