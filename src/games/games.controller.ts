import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('/all')
  find(@Query('title') title?: string) {
    if (title) return this.gamesService.find(title);
    throw new HttpException('you must specify title', HttpStatus.BAD_REQUEST);
  }

  @Get('/recent')
  getRecent() {
    return this.gamesService.getRecent();
  }

  @Get('/by-slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.gamesService.getBySlug(slug);
  }
}
