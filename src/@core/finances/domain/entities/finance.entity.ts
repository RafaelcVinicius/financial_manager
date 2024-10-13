import { BadRequestException } from '@nestjs/common';
import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { FinanceValidator } from '../validations/finance.validator';
import { CoinEntity } from '../../../coins/domain/entities/coin.entity';

export enum OrigemType {
  deposit = 'deposit',
  transfer = 'transfer',
  bonds = 'bonds',
  stocks = 'stocks',
}

export type FinanceEntityType = {
  id?: string;
  value: number;
  coin: CoinEntity;
  description: string;
  origem: string;
  origem_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class FinanceEntity extends Entity {
  id: Uuid;
  value: number;
  coin: CoinEntity;
  description: string;
  origem: OrigemType;
  origem_id: Uuid;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(props: FinanceEntityType) {
    super();

    Object.assign(this, props);

    this.id = new Uuid(props.id);
    this.origem_id = new Uuid(props.origem_id);

    this.validate();
  }

  static create(props: FinanceEntityType) {
    return new this(props);
  }

  static mock() {
    return new this({
      value: 15000,
      description: 'mock finance entity',
      coin: CoinEntity.mock(),
      origem: OrigemType.deposit,
      origem_id: new Uuid().value,
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
      coin: this.coin.toJSON(),
      origem: this.origem,
      origem_id: this.origem_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  validate(fields?: string[]) {
    return FinanceValidator.create().validate(this.notification, this, fields);
  }

  changeDescription(description: string) {
    if (!description) throw new BadRequestException();

    this.description = description;
    this.validate(['description']);
  }
}
