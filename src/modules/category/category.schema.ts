import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  collection: Collection.Category,
  timestamps: true,
  versionKey: false,
})
export class Category {
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
