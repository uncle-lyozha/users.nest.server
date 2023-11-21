import { Types } from "mongoose";

export class BanUserDto {
  readonly userId: Types.ObjectId;
  readonly banReason: string;
}
