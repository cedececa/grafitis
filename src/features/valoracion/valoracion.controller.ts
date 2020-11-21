import { Controller, Inject } from '@nestjs/common'
import { ValoracionEntity } from 'src/entities/valoracion.entity'
import { ValoracionService } from 'src/services/valoracion/valoracion.service'
import { CommonController } from '../common.controller'

const name = 'Valoracion'
@Controller(name)
export class ValoracionController extends CommonController<
  ValoracionEntity,
  ValoracionService
> {
  constructor(
    @Inject(ValoracionService) private valoracionService: ValoracionService,
  ) {
    super(valoracionService, name)
  }
}
