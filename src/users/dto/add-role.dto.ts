import { IsNumber, IsString } from "class-validator";
import { Types } from "mongoose"

export class AddRoleDto {
    @IsString({message: 'Must be a string'})
    readonly value: string;
    @IsString({message: 'Must be a string'})
    readonly userId: Types.ObjectId
}