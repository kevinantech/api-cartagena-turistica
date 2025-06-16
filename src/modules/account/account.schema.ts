import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { Role } from 'src/decorators/role/roles.decorator';

export type AccountDocument = HydratedDocument<Account>;

@Schema({
  collection: Collection.Account,
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

  @Prop({ required: true, enum: Role })
  role: Role;

  @Prop()
  phoneNumber: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
