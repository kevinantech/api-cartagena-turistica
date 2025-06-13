import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AgencyDocument = Agency & Document;

@Schema({
  collection: 'agencies',
  timestamps: true,
  versionKey: false,
})
export class Agency {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  rnt: string;

  @Prop({ required: true, unique: true })
  nit: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
