import { IsIn, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { BondEntity } from '../entities/bond.entity';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Notification } from '../../../@shared/domain/validators/notification';

export class BondRules {
  @IsUUID('4', { groups: ['id'] })
  @IsNotEmpty({ groups: ['id'] })
  id: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['unit_price'] })
  unit_price: number;

  @IsNumber()
  @IsNotEmpty({ groups: ['quantity'] })
  quantity: number;

  @IsIn(['LFT', 'NTN', 'LTN'])
  @IsString({ groups: ['code'] })
  @IsNotEmpty({ groups: ['code'] })
  code: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['fee'] })
  fee: number;

  constructor(entity: BondEntity) {
    Object.assign(this, entity);

    this.id = entity.id.value;
  }
}

export class BondValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const newFields = fields?.length
      ? fields
      : ['id', 'unit_price', 'quantity', 'code', 'fee'];

    return super.validate(notification, new BondRules(data), newFields);
  }

  static create() {
    return new this();
  }
}
