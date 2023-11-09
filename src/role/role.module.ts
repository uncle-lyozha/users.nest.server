import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './role.model';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }])],
  exports: [RoleService]
})
export class RoleModule {}
