import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  validateSync,
} from 'class-validator';

export type UpdateCoinInputConstructorProps = {
  id: string;
  value?: number;
  description?: string;
};

export class UpdateCoinInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  value?: number;

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
