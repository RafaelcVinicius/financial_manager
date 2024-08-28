import { BondEntity } from '../../../../domain/entities/bond.entity';
import BondModel from './bond.model';
import '../../../../../../types/number';

export class BondModelMapper {
  static toModel(entity: BondEntity) {
    return {
      id: entity.id.value,
      unit_price: entity.unit_price.toBigint(),
      fee: entity.fee.toBigint(),
      code: entity.code,
      quantity: entity.quantity,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    };
  }

  static toEntity(model: BondModel) {
    return new BondEntity({
      id: model.id,
      unit_price: parseFloat(model.unit_price.toString()).toDecimal(),
      fee: parseFloat(model.fee.toString()).toDecimal(),
      code: model.code,
      quantity: model.quantity,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}
