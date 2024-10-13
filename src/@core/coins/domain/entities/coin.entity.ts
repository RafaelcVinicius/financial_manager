import { BadRequestException } from '@nestjs/common';
import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { CoinValidator } from '../validations/coin.validator';

export type CoinEntityType = {
  id?: string;
  name: string;
  code: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class CoinEntity extends Entity {
  id: Uuid;
  name: string;
  code: string;
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
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
      code: this.code,
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
}
