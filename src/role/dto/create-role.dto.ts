import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

  @ApiProperty({example: "Admin", description: "User's role."})
  readonly value: string;

  @ApiProperty({example: "Administrator", description: "Role's description"})
  readonly description: string;

}
