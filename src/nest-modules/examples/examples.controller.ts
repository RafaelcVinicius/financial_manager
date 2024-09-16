import {
  Controller,
  Post,
  Inject,
  Body,
  Query,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { GetExampleUseCase } from '../../@core/examples/application/use-case/get-example/get-example.use-case';
import { ListExamplesUseCase } from '../../@core/examples/application/use-case/list-example/list-example.use-case';
import { CreateExampleUseCase } from '../../@core/examples/application/use-case/create-example/create-example.use-case';
import { UpdateExampleUseCase } from '../../@core/examples/application/use-case/update-example/update-example.use-case';
import {
  ExamplePresenter,
  ExamplePresenterCollection,
} from './examples.presenter';
import { ExampleOutput } from '../../@core/examples/application/common/example.output';
import { DeleteExampleUseCase } from '../../@core/examples/application/use-case/delete-example/delete-example.use-case';

@Controller('/')
export class ExamplesController {
  @Inject(ListExamplesUseCase)
  private listUseCase: ListExamplesUseCase;

  @Inject(GetExampleUseCase)
  private getUseCase: GetExampleUseCase;

  @Inject(CreateExampleUseCase)
  private createUseCase: CreateExampleUseCase;

  @Inject(UpdateExampleUseCase)
  private updateUseCase: UpdateExampleUseCase;

  @Inject(DeleteExampleUseCase)
  private deleteUseCase: DeleteExampleUseCase;

  @Get()
  async list(@Query() query: any) {
    return new ExamplePresenterCollection(
      await this.listUseCase.execute(query)
    );
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return ExamplesController.serialize(output);
  }

  @Post()
  async create(@Body() createPlanDto: CreateExampleDto) {
    const output = await this.createUseCase.execute(createPlanDto);
    return ExamplesController.serialize(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdateExampleDto
  ) {
    const output = await this.updateUseCase.execute({ ...updatePlanDto, id });
    return ExamplesController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute({ id });
  }

  static serialize(output: ExampleOutput) {
    return new ExamplePresenter(output);
  }
}
