import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanScheduleDocument = HydratedDocument<PlanSchedule>;

@Schema({
  timestamps: false,
  versionKey: false,
})
export class PlanSchedule {
  @Prop({ required: true })
  timeStart: Date;

  @Prop({ required: true })
  timeEnd: Date;
}

export const PlanScheduleSchema = SchemaFactory.createForClass(PlanSchedule);
