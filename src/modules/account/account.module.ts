import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { JwtConfig } from 'src/config/jwt.config';
import { AccountController } from './account.controller';
import { AccountSchema } from './account.schema';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collection.Account,
        schema: AccountSchema,
      },
    ]),
    JwtModule.registerAsync(JwtConfig({})),
  ],
  providers: [AccountService],
})
export class AccountModule {}
