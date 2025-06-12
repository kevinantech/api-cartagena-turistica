import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProviderAccountDocument = ProviderAccount & Document;

@Schema({
  collection: 'provider_accounts',
  timestamps: true,
  versionKey: false,
})
export class ProviderAccount {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  rnt: string;

  @Prop({ required: true, unique: true })
  nit: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export const ProviderAccountSchema =
  SchemaFactory.createForClass(ProviderAccount);
