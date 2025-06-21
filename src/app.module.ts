import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import env from './common/env/env.config';
import { RolesGuard } from './guards/roles.guard';
import { AccountModule } from './modules/account/account.module';
import { CategoryModule } from './modules/category/category.module';
import { DestinationModule } from './modules/destination/destination.module';
import { PlanModule } from './modules/plan/plan.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [env] }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({ uri: config.get('MONGO_URI') }),
      inject: [ConfigService],
    }),
    DriversModule,
    AccountModule,
    CategoryModule,
    DestinationModule,
    PlanModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
