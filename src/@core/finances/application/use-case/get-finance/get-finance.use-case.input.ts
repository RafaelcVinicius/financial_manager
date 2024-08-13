import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';

export type GetFinanceInputConstructorProps = {
  id: string;
};

export class GetFinanceInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  constructor(props: GetFinanceInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateGetFinanceInput {
  static validate(input: GetFinanceInput) {
    return validateSync(input);
  }
}
