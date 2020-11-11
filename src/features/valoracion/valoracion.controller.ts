import { Controller, Inject } from '@nestjs/common'
import { ValoracionEntity } from 'src/entities/Valoracion.entity'
import { ValoracionService } from 'src/services/Valoracion/Valoracion.service'
import { CommonController } from '../common.controller'

const name = 'Valoracion'
@Controller(name)
export class ValoracionController extends CommonController<
  ValoracionEntity,
  ValoracionService
> {
  constructor(@Inject(ValoracionService) service: ValoracionService) {
    super(service, name)
  }
}
