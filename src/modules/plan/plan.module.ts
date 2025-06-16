import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { PlanSchema } from './schemas/plan.schema';

@Module({
  controllers: [PlanController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collection.Plan,
        schema: PlanSchema,
      },
    ]),
  ],
  providers: [PlanService],
})
export class PlanModule {}
