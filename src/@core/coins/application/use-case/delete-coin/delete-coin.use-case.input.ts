import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';

export type DeleteCoinInputConstructorProps = {
  id: string;
};

export class DeleteCoinInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  constructor(props: DeleteCoinInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateDeleteCoinInput {
  static validate(input: DeleteCoinInput) {
    return validateSync(input);
  }
}
