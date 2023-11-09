import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Role } from "./role.model";
import { Model } from "mongoose";

@Injectable()
export class RoleService {
  constructor(@InjectModel("Role") private roleRepository: Model<Role>) {}

  async createRole(dto: CreateRoleDto) {
    const newRole = await this.roleRepository.create(dto);
    return newRole.save();
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ value: value });
    return role;
  }
}
