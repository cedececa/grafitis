import { Test, TestingModule } from '@nestjs/testing'
import { ExternalServicesService } from './external-services.service'

describe('ExternalServicesService', () => {
  let service: ExternalServicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalServicesService],
    }).compile()

    service = module.get<ExternalServicesService>(ExternalServicesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
