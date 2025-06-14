import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/decorators/role/roles.decorator';

export type AccountDocument = Account & Document;

@Schema({
  collection: 'accounts',
  timestamps: true,
  versionKey: false,
})
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ required: false })
  phoneNumber: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
