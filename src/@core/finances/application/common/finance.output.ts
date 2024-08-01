import { FinanceEntity } from '../../domain/entities/finance.entity';

export type FinanceOutput = {
  id: string;
  value: number;
  created_at: Date;
  updated_at: Date;
};

export class FinanceOutputMapper {
  static toOutput(entity: FinanceEntity): FinanceOutput {
    return entity.toJSON();
  }
}
