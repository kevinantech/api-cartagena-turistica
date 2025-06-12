import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminAccountService } from './admin-account.service';
import {
  AuthenticationResult,
  Credentials,
} from 'src/common/entities/auth.entity';

export class RegisterAdminAccountBody {
  email: string;
  password: string;
  name: string;
  verificationCode: string;
}

export class AuthenticateAdminAccountBody {
  email: string;
  password: string;
}

@Controller('admin-account')
export class AdminAccountController {
  constructor(private readonly adminAccountService: AdminAccountService) {}

  @Post('register')
  @HttpCode(201)
  async register(
    @Body(/* new ValidationPipe({ transform: true }) */)
    registerAdminAccountBody: RegisterAdminAccountBody,
  ) {
    const { name, email, password, verificationCode } =
      registerAdminAccountBody;

    return await this.adminAccountService.register(
      { name, email, password },
      verificationCode,
    );
  }

  @Post('authenticate')
  async authenticate(
    @Body() credentials: Credentials,
  ): Promise<AuthenticationResult> {
    return await this.adminAccountService.authenticate(credentials);
  }
}
