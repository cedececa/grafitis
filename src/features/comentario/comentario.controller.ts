import { Controller, Inject } from '@nestjs/common'
import { ComentarioEntity } from 'src/entities/comentario.entity'
import { ComentarioService } from 'src/services/comentario/comentario.service'
import { CommonController } from '../common.controller'

const name = 'Comentario'
@Controller(name)
export class ComentarioController extends CommonController<
  ComentarioEntity,
  ComentarioService
> {
  constructor(
    @Inject(ComentarioService) private comentarioService: ComentarioService,
  ) {
    super(comentarioService, name)
  }
  
}
