import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Create a user." })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Returns an array of all users." })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  // @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  @Get(':email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: "Give a role to a user." })
  @ApiResponse({ status: 200 })
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() roleDto: AddRoleDto) {
    return this.userService.addRole(roleDto);
  }

  @ApiOperation({ summary: "Banhammer." })
  @ApiResponse({ status: 200 })
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() banDto: BanUserDto) {
    return this.userService.banUser(banDto);
  }
}
