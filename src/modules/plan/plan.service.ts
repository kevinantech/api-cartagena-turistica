import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './schemas/plan.schema';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Collection.Plan)
    private planModel: Model<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    return await this.planModel.create(createPlanDto);
  }
}
