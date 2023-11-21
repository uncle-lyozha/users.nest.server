import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './role.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RoleService, JwtService],
  controllers: [RoleController],
  imports: [MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }])],
  exports: [RoleService]
})
export class RoleModule {}
