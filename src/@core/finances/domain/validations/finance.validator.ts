import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { FinanceEntity } from '../entities/finance.entity';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Notification } from '../../../@shared/domain/validators/notification';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';

export class FinanceRules {
  @IsUUID('4', { groups: ['id'] })
  @IsNotEmpty({ groups: ['id'] })
  id: Uuid;

  @MaxLength(255, { groups: ['description'] })
  @MinLength(3, { groups: ['description'] })
  @IsString({ groups: ['description'] })
  @IsNotEmpty({ groups: ['description'] })
  description: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['value'] })
  value: number;

  constructor(entity: FinanceEntity) {
    Object.assign(this, entity);

    this.id = entity.id.value;
  }
}

export class FinanceValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const newFields = fields?.length ? fields : ['id', 'description', 'value'];

    return super.validate(notification, new FinanceRules(data), newFields);
  }

  static create() {
    return new this();
  }
}
