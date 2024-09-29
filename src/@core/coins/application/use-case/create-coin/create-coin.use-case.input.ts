import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';

export type CreateCoinInputConstructorProps = {
  value: number;
};

export class CreateCoinInput {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  constructor(props: CreateCoinInputConstructorProps) {
    if (!props) return;

    Object.assign(this, props);
  }
}

export class ValidateCreateCoinInput {
  static validate(input: CreateCoinInput) {
    return validateSync(input);
  }
}
