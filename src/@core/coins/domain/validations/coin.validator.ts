import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { CoinEntity } from '../entities/coin.entity';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Notification } from '../../../@shared/domain/validators/notification';

export class CoinRules {
  @IsUUID('4', { groups: ['id'] })
  @IsNotEmpty({ groups: ['id'] })
  id: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['value'] })
  value: number;

  constructor(entity: CoinEntity) {
    Object.assign(this, entity);

    this.id = entity.id.value;
  }
}

export class CoinValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const newFields = fields?.length ? fields : ['id', 'value'];

    return super.validate(notification, new CoinRules(data), newFields);
  }

  static create() {
    return new this();
  }
}
