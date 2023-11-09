import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({example: "vasya@mail.mail", description: "User's e-mail"})
  readonly email: string;

  @ApiProperty({example: "vasya1234", description: "User's password"})
  readonly password: string;
}
