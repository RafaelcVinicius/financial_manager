import StockModel from './stock.model';
import '../../../../../../types/number';
import { StockEntity } from '../../../../domain/entities/stock.entity';

export class StockModelMapper {
  static toModel(entity: StockEntity) {
    return {
      id: entity.id.value,
      code: entity.code,
      quantity: entity.quantity.toBigint(),
      unit_price: entity.unit_price.toBigint(),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    };
  }

  static toEntity(model: StockModel) {
    return new StockEntity({
      id: model.id,
      code: model.code,
      quantity: parseFloat(model.quantity.toString()).toDecimal(),
      unit_price: parseFloat(model.unit_price.toString()).toDecimal(),
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}
