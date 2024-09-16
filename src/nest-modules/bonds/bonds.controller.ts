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
import { StoreBondDto } from './dto/store-bond.dto';
import { UpdateBondDto } from './dto/update-bond.dto';
import { GetBondUseCase } from '../../@core/bonds/application/use-case/get-bond/get-bond.use-case';
import { ListBondUseCase } from '../../@core/bonds/application/use-case/list-bond/list-bond.use-case';
import { StoreBondUseCase } from '../../@core/bonds/application/use-case/store-bond/store-bond.use-case';
import { UpdateBondUseCase } from '../../@core/bonds/application/use-case/update-bond/update-bond.use-case';
import {
  BondPresenter,
  BondPresenterCollection,
} from './bonds.presenter';
import { BondOutput } from '../../@core/bonds/application/common/bond.output';

@Controller('/')
export class BondController {
  @Inject(ListBondUseCase)
  private listUseCase: ListBondUseCase;

  @Inject(GetBondUseCase)
  private getUseCase: GetBondUseCase;

  @Inject(StoreBondUseCase)
  private storeUseCase: StoreBondUseCase;

  @Inject(UpdateBondUseCase)
  private updateUseCase: UpdateBondUseCase;

  @Get()
  async list(@Query() query: any) {
    return new BondPresenterCollection(
      await this.listUseCase.execute(query)
    );
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return BondController.serialize(output);
  }

  @Post()
  async store(@Body() storePlanDto: StoreBondDto) {
    const output = await this.storeUseCase.execute(storePlanDto);
    return BondController.serialize(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdateBondDto
  ) {
    const output = await this.updateUseCase.execute({ ...updatePlanDto, id });
    return BondController.serialize(output);
  }

  static serialize(output: BondOutput) {
    return new BondPresenter(output);
  }
}
