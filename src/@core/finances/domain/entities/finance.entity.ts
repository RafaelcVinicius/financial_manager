import { BadRequestException } from '@nestjs/common';
import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { FinanceValidator } from '../validations/finance.validator';

export type FinanceEntityType = {
  id?: string;
  value: number;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class FinanceEntity extends Entity {
  id: Uuid;
  value: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(props: FinanceEntityType) {
    super();

    this.id = new Uuid(props.id);
    this.value = props.value;
    this.description = props.description;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.deleted_at = props.deleted_at;

    this.validate();
  }

  static create(props: FinanceEntityType) {
    return new this(props);
  }

  static mock() {
    return new this({
      value: 15000,
      description: 'Teste',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      value: this.value,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  validate(fields?: string[]) {
    return FinanceValidator.create().validate(this.notification, this, fields);
  }

  changeValue(value: number) {
    if (!value) throw new BadRequestException();

    this.value = value;
    this.validate(['value']);
  }

  changeDescription(description: string) {
    if (!description) throw new BadRequestException();

    this.description = description;
    this.validate(['description']);
  }
}
