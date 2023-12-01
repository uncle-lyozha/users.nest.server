import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "./posts.model";
import { UsersModule } from "src/users/users.module";
import { FilesModule } from "src/files/files.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Post", schema: PostSchema }]),
    UsersModule,
    FilesModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
