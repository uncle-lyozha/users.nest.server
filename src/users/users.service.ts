import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Model } from "mongoose";
import { RoleService } from "src/role/role.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private userRepository: Model<User>,
    private roleService: RoleService
  ) {}

  async createUser(dto: CreateUserDto) {
    const newUser = await this.userRepository.create(dto);
    const role = (await this.roleService.getRoleByValue("user"));
    await newUser.$set('role', role._id);
    return newUser.save();
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }
}
