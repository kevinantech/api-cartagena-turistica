import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { Currency } from 'src/common/enums/currency.enum';
import { DurationUnit } from 'src/common/enums/duration-unit.enum';
import {
  PlanReservationConfig,
  PlanReservationConfigSchema,
} from './plan-reservation-config.schema';
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

  @Prop({ required: true, enum: DurationUnit })
  durationUnit: DurationUnit;

  @Prop({ required: true })
  durationQuantity: number;

  @Prop({ required: true, enum: Currency })
  priceCurrency: Currency;

  @Prop({ required: true })
  priceAmount: number;

  @Prop({ type: [Mongoose.Schema.Types.ObjectId], ref: Collection.Destination })
  destinations: Mongoose.Types.ObjectId[];

  @Prop({ type: [Mongoose.Schema.Types.ObjectId], ref: Collection.Category })
  categories: Mongoose.Types.ObjectId[];

  @Prop({ type: [PlanScheduleSchema] })
  schedules: PlanSchedule[];

  @Prop({ type: PlanReservationConfigSchema })
  reservationConfig: PlanReservationConfig;

  @Prop({ required: true })
  isReservable: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
