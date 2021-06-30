/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

/*   @Prop({ type: [Types.ObjectId], ref: 'Organization' })
  organizations: string */
}

export const UserSchema = SchemaFactory.createForClass(User);
