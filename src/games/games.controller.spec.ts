import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { HttpException, HttpStatus } from "@nestjs/common";

describe('AppController', () => {
  let appController: GamesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    }).compile();

    appController = app.get<GamesController>(GamesController);
  });

  describe('root', () => {
    it('should throw exception for no title', () => {
      let exception;
      try {
        appController.find();
      } catch (e) {
        exception = e;
      }
      expect(exception).toBeDefined();
      expect((exception as HttpException).getStatus()).toEqual(HttpStatus.BAD_REQUEST);
    });

    // it('should return empty array if no game is found', () => {
    //
    // });

    // it('should return all found games', () => {
    //
    // });
  });
});
