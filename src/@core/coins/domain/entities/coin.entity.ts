import { BadRequestException } from '@nestjs/common';
import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { CoinValidator } from '../validations/coin.validator';

export type CoinEntityType = {
  id?: string;
  name: string;
  code: string;
  quantity: number;
  unit_price: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class CoinEntity extends Entity {
  id: Uuid;
  name: string;
  code: string;
  quantity: number;
  unit_price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(props: CoinEntityType) {
    super();

    Object.assign(this, props);

    this.id = new Uuid(props.id);
    this.validate();
  }

  static create(props: CoinEntityType) {
    return new this(props);
  }

  static mock() {
    return new this({
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.12345612,
      unit_price: 90000,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
      code: this.code,
      quantity: this.quantity,
      unit_price: this.unit_price,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  validate(fields?: string[]) {
    return CoinValidator.create().validate(this.notification, this, fields);
  }

  changeCode(code: string) {
    if (!code) throw new BadRequestException();

    this.code = code;
    this.validate(['code']);
  }

  changeName(name: string) {
    if (!name) throw new BadRequestException();

    this.name = name;
    this.validate(['name']);
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
