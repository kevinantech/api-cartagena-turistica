import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { DriversModule } from 'src/drivers/drivers.module';
import { AccountController } from './account.controller';
import { AccountSchema } from './account.schema';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  imports: [
    DriversModule,
    MongooseModule.forFeature([
      {
        name: Collection.Account,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [AccountService],
})
export class AccountModule {}
