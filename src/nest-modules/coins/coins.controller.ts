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
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { GetCoinUseCase } from '../../@core/coins/application/use-case/get-coin/get-coin.use-case';
import { ListCoinsUseCase } from '../../@core/coins/application/use-case/list-coin/list-coin.use-case';
import { CreateCoinUseCase } from '../../@core/coins/application/use-case/create-coin/create-coin.use-case';
import { UpdateCoinUseCase } from '../../@core/coins/application/use-case/update-coin/update-coin.use-case';
import { CoinPresenter, CoinPresenterCollection } from './coins.presenter';
import { CoinOutput } from '../../@core/coins/application/common/coin.output';
import { DeleteCoinUseCase } from '../../@core/coins/application/use-case/delete-coin/delete-coin.use-case';

@Controller('/')
export class CoinsController {
  @Inject(ListCoinsUseCase)
  private listUseCase: ListCoinsUseCase;

  @Inject(GetCoinUseCase)
  private getUseCase: GetCoinUseCase;

  @Inject(CreateCoinUseCase)
  private createUseCase: CreateCoinUseCase;

  @Inject(UpdateCoinUseCase)
  private updateUseCase: UpdateCoinUseCase;

  @Inject(DeleteCoinUseCase)
  private deleteUseCase: DeleteCoinUseCase;

  @Get()
  async list(@Query() query: any) {
    return new CoinPresenterCollection(await this.listUseCase.execute(query));
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return CoinsController.serialize(output);
  }

  @Post()
  async create(@Body() createPlanDto: CreateCoinDto) {
    const output = await this.createUseCase.execute(createPlanDto);
    return CoinsController.serialize(output);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdateCoinDto) {
    const output = await this.updateUseCase.execute({ ...updatePlanDto, id });
    return CoinsController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute({ id });
  }

  static serialize(output: CoinOutput) {
    return new CoinPresenter(output);
  }
}
