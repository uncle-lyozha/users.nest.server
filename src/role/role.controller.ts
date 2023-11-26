import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roles")
export class RoleController {
  constructor(private roleservice: RoleService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleservice.createRole(roleDto);
  }


  @Roles(['Admin'])
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.roleservice.getRoles();
  }


  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  @Get("/:email")
  getRoleByValue(@Param("email") email: string) {
    return this.roleservice.getRoleByValue(email);
  }
}
