import { Test, TestingModule } from '@nestjs/testing';
import { ExternalServicesController } from './external-services.controller';

describe('ExternalServicesController', () => {
  let controller: ExternalServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalServicesController],
    }).compile();

    controller = module.get<ExternalServicesController>(ExternalServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
