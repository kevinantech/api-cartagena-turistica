import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAccountModule } from './modules/admin-account/admin-account.module';
import { ProviderAccountModule } from './modules/provider-account/provider-account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AdminAccountModule,
    ProviderAccountModule,
  ],
})
export class AppModule {}
