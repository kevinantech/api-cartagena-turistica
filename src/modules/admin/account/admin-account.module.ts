import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtConfig } from 'src/config/jwt.config';
import { AdminAccountController } from './admin-account.controller';
import { AdminAccount, AdminAccountSchema } from './admin-account.schema';
import { AdminAccountService } from './admin-account.service';

@Module({
  controllers: [AdminAccountController],
  imports: [
    MongooseModule.forFeature([
      {
        name: AdminAccount.name,
        schema: AdminAccountSchema,
      },
    ]),
    JwtModule.registerAsync(JwtConfig({})),
  ],
  providers: [AdminAccountService],
})
export class AdminAccountModule {}
