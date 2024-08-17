import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StockEntity } from '../entities/stock.entity';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Notification } from '../../../@shared/domain/validators/notification';

export class StockRules {
  @IsUUID('4', { groups: ['id'] })
  @IsNotEmpty({ groups: ['code'] })
  id: string;

  @MaxLength(10, { groups: ['code'] })
  @MinLength(3, { groups: ['code'] })
  @IsString({ groups: ['code'] })
  @IsNotEmpty({ groups: ['code'] })
  code: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['quantity'] })
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ groups: ['unit_price'] })
  unit_price: number;

  constructor(entity: StockEntity) {
    Object.assign(this, entity);

    this.id = entity.id.value;
  }
}

export class StockValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const newFields = fields?.length ? fields : ['id', 'description', 'value'];

    return super.validate(notification, new StockRules(data), newFields);
  }

  static create() {
    return new this();
  }
}
