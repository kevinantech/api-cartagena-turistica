import { Body, Controller, Post } from '@nestjs/common';
import { Credentials } from 'src/common/entities/auth.entity';
import { RegisterProviderAccountDto } from './dtos/register-provider-account.dto';
import { ProviderAccountService } from './provider-account.service';

@Controller('provider-account')
export class ProviderAccountController {
  constructor(
    private readonly providerAccountService: ProviderAccountService,
  ) {}
  @Post('register')
  async register(
    @Body() registerProviderAccountBody: RegisterProviderAccountDto,
  ) {
    return await this.providerAccountService.register(
      registerProviderAccountBody,
    );
  }

  @Post('authenticate')
  async authenticate(@Body() credentials: Credentials) {
    return await this.providerAccountService.authenticate(credentials);
  }
}
