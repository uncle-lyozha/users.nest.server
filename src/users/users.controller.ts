import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

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

  @Roles('654ce30f8dd50f3e21d2b16b', '654ceb75734409051ec3558c')
  @UseGuards(RolesGuard)
  @Get(':email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}
