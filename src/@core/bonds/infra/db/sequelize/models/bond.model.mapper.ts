import { BondEntity } from '../../../../domain/entities/bond.entity';
import BondModel from './bond.model';
import '../../../../../../types/number';

export class BondModelMapper {
  static toModel(entity: BondEntity) {
    return {
      id: entity.id.value,
      value: entity.value.toBigint(),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    };
  }

  static toEntity(model: BondModel) {
    return new BondEntity({
      id: model.id,
      value: parseFloat(model.value.toString()).toDecimal(),
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}
