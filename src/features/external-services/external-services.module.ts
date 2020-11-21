import { HttpModule, Module } from '@nestjs/common'
import { ExternalServicesService } from 'src/services/external-services/external-services.service'
import { ExternalServicesController } from './external-services.controller'

@Module({
  imports: [HttpModule],
  controllers: [ExternalServicesController],
  providers: [ExternalServicesService],
  exports: [ExternalServicesService],
})
export class ExternalServicesModule {}
