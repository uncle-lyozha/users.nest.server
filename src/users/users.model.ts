import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: "Vasya", description: "User's name" })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: "vasya@mail.mail", description: "User's e-mail" })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: "vasya1234", description: "User's password" })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: "false", description: "Shows if a user is banned" })
  @Prop({ default: false })
  banned: boolean;

  @ApiProperty({
    example: "Rude and ugly",
    description: "Explains why a user is banned",
  })
  @Prop()
  banReason: string;

  @Prop()
  role: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User);
