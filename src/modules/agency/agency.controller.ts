import { Body, Controller, Post } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { RegisterAgencyDto } from './dtos/register-agency.dto';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  async register(@Body() registerAgencyBody: RegisterAgencyDto) {
    return await this.agencyService.register(registerAgencyBody);
  }
}
