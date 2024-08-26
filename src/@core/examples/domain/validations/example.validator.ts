import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ExampleEntity } from '../entities/example.entity';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Notification } from '../../../@shared/domain/validators/notification';

export class ExampleRules {
  @IsUUID('4', { groups: ['id'] })
  @IsNotEmpty({ groups: ['id'] })
  id: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['value'] })
  value: number;

  constructor(entity: ExampleEntity) {
    Object.assign(this, entity);

    this.id = entity.id.value;
  }
}

export class ExampleValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const newFields = fields?.length ? fields : ['id', 'value'];

    return super.validate(notification, new ExampleRules(data), newFields);
  }

  static create() {
    return new this();
  }
}
