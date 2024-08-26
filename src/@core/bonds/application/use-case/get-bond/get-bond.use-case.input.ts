import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';

export type GetBondInputConstructorProps = {
  id: string;
};

export class GetBondInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  constructor(props: GetBondInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
  }
}

export class ValidateGetBondInput {
  static validate(input: GetBondInput) {
    return validateSync(input);
  }
}
