import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DestinationDocument = Destination & Document;

@Schema({
  collection: 'destinations',
  timestamps: true,
  versionKey: false,
})
export class Destination {
  @Prop({ required: true })
  name: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
