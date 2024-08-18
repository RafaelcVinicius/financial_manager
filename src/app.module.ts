import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancesModule } from './nest-modules/finances/finances.module';
import { ConfigModule } from './nest-modules/config/config.module';
import { DatabaseModule } from './nest-modules/database/database.module';
import { MigrationsModule } from './nest-modules/database/migrations.module';
import { SharedModule } from './nest-modules/shared/shared.module';
import { EventsModule } from './nest-modules/events/events.module';
import { RoutersModule } from './nest-modules/routers/routers.module';
import { StocksModule } from './nest-modules/stocks/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RoutersModule.register(),
    SharedModule,
    DatabaseModule,
    MigrationsModule,
    EventsModule,
    FinancesModule,
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
