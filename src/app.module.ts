import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancesModule } from './nest-modules/finances-module/finances.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { MigrationsModule } from './nest-modules/database-module/migrations.module';
import { SharedModule } from './nest-modules/shared-module/shared.module';
import { EventsModule } from './nest-modules/events-module/events.module';
import { RoutersModule } from './nest-modules/routers-module/routers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RoutersModule.register(),
    SharedModule,
    DatabaseModule,
    FinancesModule,
    MigrationsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
