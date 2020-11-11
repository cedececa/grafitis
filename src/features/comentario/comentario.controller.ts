import { Controller, Inject } from '@nestjs/common'
import { ComentarioEntity } from 'src/entities/Comentario.entity'
import { ComentarioService } from 'src/services/Comentario/Comentario.service'
import { CommonController } from '../common.controller'

const name = 'Comentario'
@Controller(name)
export class ComentarioController extends CommonController<
  ComentarioEntity,
  ComentarioService
> {
  constructor(@Inject(ComentarioService) service: ComentarioService) {
    super(service, name)
  }
}
