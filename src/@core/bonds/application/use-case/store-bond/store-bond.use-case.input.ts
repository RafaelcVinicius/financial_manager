import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export type StoreBondInputConstructorProps = {
  unit_price: number;
  quantity: number;
  fee: number;
  code: string;
};

export class StoreBondInput {
  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsIn(['LFT', 'NTN', 'LTN'])
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  fee: number;

  constructor(props: StoreBondInputConstructorProps) {
    if (!props) return;

    Object.assign(this, props);
  }
}

export class ValidateStoreBondInput {
  static validate(input: StoreBondInput) {
    return validateSync(input);
  }
}
