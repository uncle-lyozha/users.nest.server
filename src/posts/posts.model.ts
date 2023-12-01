import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Types } from "mongoose";

// export type UserDocument = HydratedDocument<User>;

@Schema()
export class Post {
  @ApiProperty({ example: "What we do in the shadows", description: "Post title" })
  @Prop({ required: false })
  title: string;

  @ApiProperty({ example: "Bla bla lba", description: "Post content" })
  @Prop({ required: false })
  content: string;
  
  @Prop({type: Types.ObjectId, ref: 'User', required: true})
  author: Types.ObjectId;

  @Prop({required: false})
  image: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
