import { ExampleEntity } from '../../domain/entities/example.entity';

export type ExampleOutput = {
  id: string;
  value: number;
  created_at: Date;
  updated_at: Date;
};

export class ExampleOutputMapper {
  static toOutput(entity: ExampleEntity): ExampleOutput {
    return entity.toJSON();
  }
}
