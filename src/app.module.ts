import { Module } from '@nestjs/common';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';

@Module({
  imports: [],
  controllers: [GamesController],
  providers: [GamesService],
})
export class AppModule {}
