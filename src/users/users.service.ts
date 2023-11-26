import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Model, Mongoose } from "mongoose";
import { RoleService } from "src/role/role.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private userRepository: Model<User>,
    private roleService: RoleService
  ) {}

  async createUser(dto: CreateUserDto) {
    const newUser = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("user");
    await newUser.$set("role", role._id);
    newUser.roles.push(role._id);
    return newUser.save();
  }

  async getAllUsers() {
    const users = await this.userRepository
      .find()
      .populate("roles", "-_id -__v");
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository
      .findOne({ email: email })
      .populate("roles", "-_id -__v");
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      user.roles.push(role._id);
      user.save();
      return user;
    }
    throw new HttpException("Can not find user or role", HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findById(dto.userId);
    console.log(user);
    if (!user) {
      throw new HttpException("Can not find user", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    user.save();
    return user;
  }
}
