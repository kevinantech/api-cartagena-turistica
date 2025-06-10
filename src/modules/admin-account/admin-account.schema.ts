import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminAccountDocument = AdminAccount & Document;

@Schema({
  collection: 'admin_accounts',
  timestamps: true,
  versionKey: false,
})
export class AdminAccount {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AdminAccountSchema = SchemaFactory.createForClass(AdminAccount);
