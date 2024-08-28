import { BadRequestException } from '@nestjs/common';
import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { BondValidator } from '../validations/bond.validator';

export type BondEntityType = {
  id?: string;
  unit_price: number;
  code: string;
  quantity: number;
  fee: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class BondEntity extends Entity {
  id: Uuid;
  unit_price: number;
  code: string;
  quantity: number;
  fee: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(props: BondEntityType) {
    super();

    Object.assign(this, props);

    this.id = new Uuid(props.id);

    this.validate();
  }

  static create(props: BondEntityType) {
    return new this(props);
  }

  static mock() {
    return new this({
      unit_price: 1500,
      code: 'LFT',
      quantity: 0.5,
      fee: 0.15,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      unit_price: this.unit_price,
      code: this.code,
      quantity: this.quantity,
      fee: this.fee,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  validate(fields?: string[]) {
    return BondValidator.create().validate(this.notification, this, fields);
  }

  changeUnitPrice(unit_price: number) {
    if (!unit_price) throw new BadRequestException();

    this.unit_price = unit_price;
    this.validate(['unit_price']);
  }
}
