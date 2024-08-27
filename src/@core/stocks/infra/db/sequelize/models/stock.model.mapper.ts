import StockModel from './stock.model';
import '../../../../../../types/number';
import { StockEntity } from '../../../../domain/entities/stock.entity';

export class StockModelMapper {
  static toModel(entity: StockEntity) {
    return {
      id: entity.id.value,
      code: entity.code,
      quantity: entity.quantity,
      unit_price: entity.unit_price.toBigint(),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  static toEntity(model: StockModel) {
    return new StockEntity({
      id: model.id,
      code: model.code,
      quantity: model.quantity,
      unit_price: parseFloat(model.unit_price.toString()).toDecimal(),
      created_at: model.created_at,
      updated_at: model.updated_at,
    });
  }
}
