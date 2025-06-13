import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminAccountService } from './admin-account.service';
import {
  AuthenticationResult,
  Credentials,
} from 'src/common/entities/auth.entity';
import { RegisterAdminAccountDto } from './dtos/register-admin-account.dto';

@Controller('admin/account')
export class AdminAccountController {
  constructor(private readonly adminAccountService: AdminAccountService) {}

  @Post('register')
  @HttpCode(201)
  async register(
    @Body()
    registerAdminAccountBody: RegisterAdminAccountDto,
  ) {
    const { verificationCode, ...adminBody } = registerAdminAccountBody;
    return await this.adminAccountService.register(adminBody, verificationCode);
  }

  @Post('authenticate')
  async authenticate(
    @Body() credentials: Credentials,
  ): Promise<AuthenticationResult> {
    return await this.adminAccountService.authenticate(credentials);
  }
}
