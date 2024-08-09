import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancesModule } from './nest-modules/finances-module/finances.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { MigrationsModule } from './nest-modules/database-module/migrations.module';
import { SharedModule } from './nest-modules/shared-module/shared.module';
import { EventsModule } from './nest-modules/events_module/events.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FinancesModule,
    DatabaseModule,
    MigrationsModule,
    SharedModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
