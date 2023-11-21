import { Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Model, Mongoose } from "mongoose";
import { RoleService } from "src/role/role.service";

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
    const users = await this.userRepository.find().populate('roles', '-_id -__v');
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email: email }).populate('roles', '-_id -__v');
    return user;
  }
}
