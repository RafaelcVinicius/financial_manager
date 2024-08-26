import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';

export type GetExampleInputConstructorProps = {
  id: string;
};

export class GetExampleInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  constructor(props: GetExampleInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateGetExampleInput {
  static validate(input: GetExampleInput) {
    return validateSync(input);
  }
}
