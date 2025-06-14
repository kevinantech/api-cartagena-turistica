import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import {
  AuthenticationResult,
  Credentials,
} from 'src/common/entities/auth.entity';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Roles, Role } from 'src/decorators/role/roles.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('authenticate')
  async authenticate(
    @Body() credentials: Credentials,
  ): Promise<AuthenticationResult> {
    return await this.accountService.authenticate(credentials);
  }

  @Post('register')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body()
    registerAccountBody: RegisterAccountDto,
  ) {
    return await this.accountService.register(registerAccountBody);
  }
}
