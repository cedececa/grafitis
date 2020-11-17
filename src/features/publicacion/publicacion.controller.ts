import { Controller, Inject } from '@nestjs/common'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { PublicacionService } from 'src/services/publicacion/publicacion.service'
import { CommonController } from '../common.controller'

const name = 'Publicacion'
@Controller(name)
export class PublicacionController extends CommonController<
  PublicacionEntity,
  PublicacionService
> {
  constructor(@Inject(PublicacionService) service: PublicacionService) {
    super(service, name)
  }
}
