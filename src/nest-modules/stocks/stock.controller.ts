import {
  Controller,
  Post,
  Inject,
  Body,
  Query,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ListStockUseCase } from '../../@core/stocks/application/use-case/list-stock/list-stock.use-case';
import { GetStockUseCase } from '../../@core/stocks/application/use-case/get-stock/get-stock.use-case';
import { StoreStockUseCase } from '../../@core/stocks/application/use-case/store-stock/store-stock.use-case';
import { UpdateStockUseCase } from '../../@core/stocks/application/use-case/update-stock/update-stock.use-case';
import { StockPresenter, StockPresenterCollection } from './stock.presenter';
import { StoreStockDto } from './dto/store-stock_dto';
import { UpdateStockDto } from './dto/update-stock_dto';
import { StockOutput } from '../../@core/stocks/application/common/stock.output';

@Controller('/')
export class StockController {
  @Inject(ListStockUseCase)
  private listUseCase: ListStockUseCase;

  @Inject(GetStockUseCase)
  private getUseCase: GetStockUseCase;

  @Inject(StoreStockUseCase)
  private storeUseCase: StoreStockUseCase;

  @Inject(UpdateStockUseCase)
  private updateUseCase: UpdateStockUseCase;

  @Get()
  async list(@Query() query: any) {
    return new StockPresenterCollection(await this.listUseCase.execute(query));
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return StockController.serialize(output);
  }

  @Post()
  async store(@Body() storePlanDto: StoreStockDto) {
    const output = await this.storeUseCase.execute(storePlanDto);
    return StockController.serialize(output);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdateStockDto) {
    const output = await this.updateUseCase.execute({ ...updatePlanDto, id });
    return StockController.serialize(output);
  }

  static serialize(output: StockOutput) {
    return new StockPresenter(output);
  }
}
