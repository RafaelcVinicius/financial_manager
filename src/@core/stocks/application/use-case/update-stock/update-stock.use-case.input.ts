import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  validateSync,
} from 'class-validator';

export type UpdateStockInputConstructorProps = {
  id: string;
  code?: string;
  quantity?: number;
  unit_price?: number;
};

export class UpdateStockInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsString()
  @MaxLength(10)
  @MinLength(3)
  @IsOptional()
  code?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  unit_price?: number;

  constructor(props: UpdateStockInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
    this.code = props.code;
    this.quantity = props.quantity;
    this.unit_price = props.unit_price;
  }
}

export class ValidateGetStockInput {
  static validate(input: UpdateStockInput) {
    return validateSync(input);
  }
}
