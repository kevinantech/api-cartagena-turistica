import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Role, Roles } from 'src/decorators/role/roles.decorator';
import { AccountService } from './account.service';
import { AuthenticateAccountDto } from './dto/authenticate-account.dto';
import { RegisterAccountDto } from './dto/register-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() authenticateAccountDto: AuthenticateAccountDto) {
    return await this.accountService.authenticate(authenticateAccountDto);
  }

  @Post('register')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body()
    registerAccountDto: RegisterAccountDto,
  ) {
    return await this.accountService.register(registerAccountDto);
  }
}
