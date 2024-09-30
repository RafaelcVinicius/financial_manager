import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export type CreateCoinInputConstructorProps = {
  code: string;
  name: string;
  quantity: number;
  unit_price: number;
};

export class CreateCoinInput {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

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
