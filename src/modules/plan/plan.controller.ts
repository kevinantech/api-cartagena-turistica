import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Role, Roles } from 'src/decorators/role/roles.decorator';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPlanDto: CreatePlanDto) {
    return await this.planService.create(createPlanDto);
  }
}
