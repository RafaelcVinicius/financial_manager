import { Entity } from '../../../@shared/domain/entity';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';

export type FinanceEntityType = {
  id?: string;
  value: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class FinanceEntity extends Entity {
  id: Uuid;
  value: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(props: FinanceEntityType) {
    super();

    this.id = new Uuid(props.id);
    this.value = props.value;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.deleted_at = props.deleted_at;
  }

  static create(props: FinanceEntityType) {
    return new this(props);
  }

  static mock() {
    return new this({
      value: 15000,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      value: this.value,
      created_at: this.created_at,
      updated_at: this.created_at,
      deleted_at: this.deleted_at,
    };
  }
}
