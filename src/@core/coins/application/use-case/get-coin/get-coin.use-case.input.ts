import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';

export type GetCoinInputConstructorProps = {
  id: string;
};

export class GetCoinInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  constructor(props: GetCoinInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateGetCoinInput {
  static validate(input: GetCoinInput) {
    return validateSync(input);
  }
}
