import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';

export type DestinationDocument = HydratedDocument<Destination>;

@Schema({
  collection: Collection.Destination,
  timestamps: true,
  versionKey: false,
})
export class Destination {
  @Prop({ required: true })
  name: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
