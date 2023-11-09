import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller("roles")
export class RoleController {
  constructor(private roleservice: RoleService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleservice.createRole(roleDto);
  }

  @Get("/:value")
  getRoleByValue(@Param("value") value: string) {
    return this.roleservice.getRoleByValue(value);
  }
}
