import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Index')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }
}
