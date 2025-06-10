import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAccountModule } from './modules/admin-account/admin-account.module';

@Module({
  imports: [
    AdminAccountModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
  ],
})
export class AppModule {}
