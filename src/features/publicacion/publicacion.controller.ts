import { Controller, Inject } from '@nestjs/common'
import { PublicacionEntity } from 'src/entities/Publicacion.entity'
import { PublicacionService } from 'src/services/Publicacion/Publicacion.service'
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
