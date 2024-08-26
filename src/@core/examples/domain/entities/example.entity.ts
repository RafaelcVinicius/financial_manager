import { BadRequestException } from '@nestjs/common';
import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { ExampleValidator } from '../validations/example.validator';

export type ExampleEntityType = {
  id?: string;
  value: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class ExampleEntity extends Entity {
  id: Uuid;
  value: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(props: ExampleEntityType) {
    super();

    this.id = new Uuid(props.id);
    this.value = props.value;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.deleted_at = props.deleted_at;

    this.validate();
  }

  static create(props: ExampleEntityType) {
    return new this(props);
  }

  static mock() {
    return new this({
      value: 15000,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      value: this.value,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  validate(fields?: string[]) {
    return ExampleValidator.create().validate(this.notification, this, fields);
  }

  changeValue(value: number) {
    if (!value) throw new BadRequestException();

    this.value = value;
    this.validate(['value']);
  }
}
