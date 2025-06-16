import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DurationUnit } from 'src/common/enums/duration-unit.enum';

export type PlanDurationDocument = HydratedDocument<PlanDuration>;

@Schema({
  timestamps: false,
  versionKey: false,
})
export class PlanDuration {
  @Prop({ required: true })
  unit: DurationUnit;

  @Prop({ required: true })
  quantity: number;
}

export const PlanDurationSchema = SchemaFactory.createForClass(PlanDuration);
