import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './modules/account/account.module';
import { CategoryModule } from './modules/category/category.module';
import { DestinationModule } from './modules/destination/destination.module';
import { PlanModule } from './modules/plan/plan.module';
import { ResourceModule } from './modules/resource/resource.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AccountModule,
    CategoryModule,
    DestinationModule,
    PlanModule,
    ResourceModule,
  ],
})
export class AppModule {}
