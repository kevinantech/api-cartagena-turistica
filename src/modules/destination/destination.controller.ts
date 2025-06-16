import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Role, Roles } from 'src/decorators/role/roles.decorator';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDestinationDto: CreateDestinationDto) {
    return await this.destinationService.create(createDestinationDto);
  }
}
