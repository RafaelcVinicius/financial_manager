import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';

export type DeleteExampleInputConstructorProps = {
  id: string;
};

export class DeleteExampleInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  constructor(props: DeleteExampleInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateDeleteExampleInput {
  static validate(input: DeleteExampleInput) {
    return validateSync(input);
  }
}
