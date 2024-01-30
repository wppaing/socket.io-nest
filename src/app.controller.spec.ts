import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('should return hello', async () => {
      const result = 'Hello World!';

      jest.spyOn(appService, 'getHello').mockImplementation(() => result);

      expect(await appController.getHello()).toBe(result);
    });
  });
});
