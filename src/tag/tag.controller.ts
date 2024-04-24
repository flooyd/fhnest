import { Controller, Get, Ip } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(@Ip() ip): Promise<TagEntity[]> {
    console.log('GET ALL TAGS ', ip, ' ', new Date());
    return await this.tagService.findAll();
  }
}
