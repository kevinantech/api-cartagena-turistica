import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';

export type PlanBookingConfigDocument = HydratedDocument<PlanBookingConfig>;

@Schema({
  timestamps: false,
  versionKey: false,
})
export class PlanBookingConfig {
  @Prop({ type: Mongoose.Types.ObjectId, ref: Collection.Plan })
  planId: Mongoose.Types.ObjectId;

  @Prop()
  maxPassengersPerUnit?: number;

  @Prop()
  requiresAvailableUnit?: boolean;

  @Prop()
  allowOverbooking?: boolean;

  @Prop({ type: [Mongoose.Types.ObjectId], ref: Collection.Resource })
  resources: Mongoose.Types.ObjectId[];
}

export const PlanBookingConfigSchema =
  SchemaFactory.createForClass(PlanBookingConfig);
