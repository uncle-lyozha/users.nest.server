import { ApiProperty } from "@nestjs/swagger";
//validation of input
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({example: "vasya@mail.mail", description: "User's e-mail"})
  @IsString({message: 'Must be a string'})
  @IsEmail({}, {message: 'E-mail is not valid.'})
  readonly email: string;

  @ApiProperty({example: "vasya1234", description: "User's password"})
  @IsString({message: 'Must be a string'})
  @Length(4, 16, {message: 'Must be 4-16 characters.'})
  readonly password: string;
}
