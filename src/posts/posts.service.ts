import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "./posts.model";
import { FilesService } from "src/files/files.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel("Post") private postRepository: Model<Post>,
    private filesService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
