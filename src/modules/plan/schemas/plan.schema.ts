import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { Currency } from 'src/common/enums/currency.enum';
import {
  PlanBookingConfig,
  PlanBookingConfigSchema,
} from './plan-booking-config.schema';
import { PlanDuration, PlanDurationSchema } from './plan-duration.schema';
import { PlanSchedule, PlanScheduleSchema } from './plan-schedule.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({
  collection: Collection.Plan,
  timestamps: true,
  versionKey: false,
})
export class Plan {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: PlanDurationSchema, required: true })
  duration: PlanDuration;

  @Prop({ required: true })
  includes: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  currency: Currency;

  @Prop({ type: [Mongoose.Schema.Types.ObjectId], ref: Collection.Destination })
  destinations: Mongoose.Types.ObjectId[];

  @Prop({ type: [Mongoose.Schema.Types.ObjectId], ref: Collection.Category })
  categories: Mongoose.Types.ObjectId[];

  @Prop({ type: [PlanScheduleSchema] })
  schedules: PlanSchedule[];

  @Prop({ type: PlanBookingConfigSchema })
  bookingConfig: PlanBookingConfig;

  @Prop({ required: true })
  isBookeable: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
