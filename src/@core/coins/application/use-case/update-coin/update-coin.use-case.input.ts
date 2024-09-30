import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';

export type UpdateCoinInputConstructorProps = {
  id: string;
  code: string;
  name: string;
  quantity: number;
  unit_price: number;
};

export class UpdateCoinInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  code?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  unit_price?: number;

  constructor(props: UpdateCoinInputConstructorProps) {
    if (!props) return;

    Object.assign(this, props);
  }
}

export class ValidateCoinInput {
  static validate(input: UpdateCoinInput) {
    return validateSync(input);
  }
}
