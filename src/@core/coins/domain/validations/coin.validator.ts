import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { CoinEntity } from '../entities/coin.entity';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Notification } from '../../../@shared/domain/validators/notification';

export class CoinRules {
  @IsUUID('4', { groups: ['id'] })
  @IsNotEmpty({ groups: ['id'] })
  id: string;

  @IsString({ groups: ['code'] })
  @MaxLength(8, { groups: ['code'] })
  @IsNotEmpty({ groups: ['code'] })
  code: string;

  @IsString({ groups: ['name'] })
  @MaxLength(8, { groups: ['name'] })
  @IsNotEmpty({ groups: ['name'] })
  name: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['quantity'] })
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ groups: ['unit_price'] })
  unit_price: number;

  constructor(entity: CoinEntity) {
    Object.assign(this, entity);

    this.id = entity.id.value;
  }
}

export class CoinValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const newFields = fields?.length
      ? fields
      : ['id', 'code', 'quantity', 'unit_price'];

    return super.validate(notification, new CoinRules(data), newFields);
  }

  static create() {
    return new this();
  }
}
