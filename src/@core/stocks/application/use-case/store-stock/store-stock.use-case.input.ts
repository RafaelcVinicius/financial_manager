import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  validateSync,
} from 'class-validator';

export type StoreStockInputConstructorProps = {
  code: string;
  quantity: number;
  unit_price: number;
};

export class StoreStockInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(3)
  code: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  constructor(props: StoreStockInputConstructorProps) {
    if (!props) return;

    this.code = props.code;
    this.quantity = props.quantity;
    this.unit_price = props.unit_price;
  }
}

export class ValidateStoreStockInput {
  static validate(input: StoreStockInput) {
    return validateSync(input);
  }
}
