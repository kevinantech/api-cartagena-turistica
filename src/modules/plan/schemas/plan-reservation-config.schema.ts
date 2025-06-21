import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';

export type PlanReservationConfigDocument =
  HydratedDocument<PlanReservationConfig>;

@Schema({
  timestamps: false,
  versionKey: false,
})
export class PlanReservationConfig {
  @Prop({ type: Mongoose.Types.ObjectId, ref: Collection.Plan })
  planId: Mongoose.Types.ObjectId;

  @Prop({ type: [Mongoose.Types.ObjectId], ref: Collection.Resource })
  resources: Mongoose.Types.ObjectId[];
}

export const PlanReservationConfigSchema = SchemaFactory.createForClass(
  PlanReservationConfig,
);
