import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtConfig } from 'src/config/jwt.config';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
    JwtModule.registerAsync(JwtConfig({})),
  ],
  providers: [AccountService],
})
export class AccountModule {}
