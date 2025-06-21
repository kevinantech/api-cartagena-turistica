import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { ResourceType } from 'src/common/enums/resource-type.enum';

export type ReservableResourceDocument = HydratedDocument<Resource>;

@Schema({
  collection: Collection.Resource,
  timestamps: true,
  versionKey: false,
})
export class Resource {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, enum: ResourceType })
  type: ResourceType;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  availability: boolean;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
