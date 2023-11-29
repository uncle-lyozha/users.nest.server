import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Model, Mongoose } from "mongoose";
import { RoleService } from "src/role/role.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private userRepository: Model<User>,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const candidate = await this.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        "User with this e-mail already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);

    const newUser = await this.userRepository.create({...dto, password: hashPassword});
    const role = await this.roleService.getRoleByValue("user");
    newUser.$set("role", role._id);
    newUser.roles.push(role._id);
    this.generateToken(newUser)
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
    if (!user) {
      throw new HttpException("Can not find user", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    user.save();
    return user;
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      password: user.password,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
