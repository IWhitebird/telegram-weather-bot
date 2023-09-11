import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true})
  chatId: string;

  @Prop({ required: true})
  first_name: string;

  @Prop({ required:true }) 
  latitude: number;

  @Prop({ required:true })
  longitude: number;

  @Prop({ required:true })
  subscription: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
