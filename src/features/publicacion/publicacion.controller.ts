import { Controller, Get, Inject, Param } from '@nestjs/common'
import { Result } from 'src/common/result.interface'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { ComentarioService } from 'src/services/comentario/comentario.service'
import { PublicacionService } from 'src/services/publicacion/publicacion.service'
import { CommonController } from '../common.controller'

const name = 'publicacion'
@Controller(name)
export class PublicacionController extends CommonController<
  PublicacionEntity,
  PublicacionService
> {
  constructor(
    @Inject(PublicacionService) private publicacionService: PublicacionService,
    @Inject(ComentarioService) private comentarioService: ComentarioService,
  ) {
    super(publicacionService, name)
  }

  @Get(':id')
  async getPublicacionDetallada(@Param('id') id: number): Promise<Result> {
    const r = await this.publicacionService.getPublicacionDetallada(id)
    return {
      code: 200,
      message: 'id: ' + id,
      data: r,
      succeed: r ? true : false,
    }
  }

  @Get(':idPublicacion/comentario')
  async getComentariosByIdPublicacion(
    @Param('idPublicacion') idPub,
  ): Promise<Result> {
    const r = await this.comentarioService.getManyByPublicacionId(idPub)
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }
}
