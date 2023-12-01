import { Types } from "mongoose";

export class CreatePostDto {
  
  readonly title: string;

  readonly content: string;

  readonly userId: Types.ObjectId;

  readonly image: string;

}
