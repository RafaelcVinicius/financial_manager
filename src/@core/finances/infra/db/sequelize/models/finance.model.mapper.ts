import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import FinanceModel from './finance.model';
import '../../../../../../types/number';

export class FinanceModelMapper {
  static toModel(entity: FinanceEntity) {
    return {
      id: entity.id.value,
      value: entity.value.toBigint(),
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    };
  }

  static toEntity(model: FinanceModel) {
    return new FinanceEntity({
      id: model.id,
      value: parseFloat(model.value.toString()).toDecimal(),
      description: model.description,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}
