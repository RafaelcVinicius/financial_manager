import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';

export type UpdateBondInputConstructorProps = {
  id: string;
  unit_price?: number;
  quantity?: number;
  fee?: number;
  code?: string;
};

export class UpdateBondInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  unit_price?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsIn(['LFT', 'NTN', 'LTN'])
  @IsString()
  @IsOptional()
  code?: string;

  @IsNumber()
  @IsOptional()
  fee?: number;

  constructor(props: UpdateBondInputConstructorProps) {
    if (!props) return;

    Object.assign(this, props);
  }
}

export class ValidateGetBondInput {
  static validate(input: UpdateBondInput) {
    return validateSync(input);
  }
}
