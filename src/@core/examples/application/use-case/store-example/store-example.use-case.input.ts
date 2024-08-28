import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';

export type StoreExampleInputConstructorProps = {
  value: number;
};

export class StoreExampleInput {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  constructor(props: StoreExampleInputConstructorProps) {
    if (!props) return;

    Object.assign(this, props);
  }
}

export class ValidateStoreExampleInput {
  static validate(input: StoreExampleInput) {
    return validateSync(input);
  }
}
