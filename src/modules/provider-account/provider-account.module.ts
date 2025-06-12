import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtConfig } from 'src/config/jwt.config';
import { ProviderAccountController } from './provider-account.controller';
import {
  ProviderAccount,
  ProviderAccountSchema,
} from './provider-account.schema';
import { ProviderAccountService } from './provider-account.service';

@Module({
  controllers: [ProviderAccountController],
  imports: [
    MongooseModule.forFeature([
      {
        name: ProviderAccount.name,
        schema: ProviderAccountSchema,
      },
    ]),
    JwtModule.registerAsync(JwtConfig({})),
  ],
  providers: [ProviderAccountService],
})
export class ProviderAccountModule {}
