import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';

export type GetStockInputConstructorProps = {
  id: string;
};

export class GetStockInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  constructor(props: GetStockInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateGetStockInput {
  static validate(input: GetStockInput) {
    return validateSync(input);
  }
}
