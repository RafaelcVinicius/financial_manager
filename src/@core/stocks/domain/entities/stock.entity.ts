import { BadRequestException } from '@nestjs/common';
import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { StockValidator } from '../validations/stock.validator';

export type StockEntityType = {
  id?: string;
  code: string;
  quantity: number;
  unit_price: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class StockEntity extends Entity {
  id: Uuid;
  code: string;
  quantity: number;
  unit_price: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;

  constructor(props: StockEntityType) {
    super();

    this.id = new Uuid(props.id);
    this.code = props.code;
    this.quantity = props.quantity;
    this.unit_price = props.unit_price;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.deleted_at = props.deleted_at;

    this.validate();
  }

  static create(props: StockEntityType) {
    return new this(props);
  }

  static mock() {
    return new this({
      code: 'bbsa3',
      quantity: 5,
      unit_price: 23,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      code: this.code,
      quantity: this.quantity,
      unit_price: this.unit_price,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  validate(fields?: string[]) {
    return StockValidator.create().validate(this.notification, this, fields);
  }

  changeCode(code: string) {
    if (!code) throw new BadRequestException();

    this.code = code;
    this.validate(['code']);
  }

  changeQuantity(quantity: number) {
    if (!quantity) throw new BadRequestException();

    this.quantity = quantity;
    this.validate(['quantity']);
  }

  changeUnitPrice(unit_price: number) {
    if (!unit_price) throw new BadRequestException();

    this.unit_price = unit_price;
    this.validate(['unit_price']);
  }
}
