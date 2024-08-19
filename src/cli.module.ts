import { Module } from '@nestjs/common';
import { CreateFileCommand } from './file.command';
import { CommandRunnerModule } from 'nest-commander';

@Module({
  imports: [CommandRunnerModule],
  providers: [CreateFileCommand],
})
export class CliModule {}
