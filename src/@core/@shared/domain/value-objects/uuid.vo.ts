import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ValueObject } from '../value-object';

export class Uuid extends ValueObject {
  constructor(value?: string) {
    super(value || uuidv4());
  }

  public validate(): void {
    if (!uuidValidate(this.value)) {
      throw new InvalidUuidError('uuid');
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID must be a valida UUID');
    this.name = 'InvalidUuidError';
  }
}
