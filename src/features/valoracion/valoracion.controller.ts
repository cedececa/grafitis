import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ResponseHandler } from 'src/common/response.handler'
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

  @Get('publicacion/:idPublicacion')
  async getValoracionesByIdPublicacion(
    @Param('idPublicacion') idPublicacion: number,
  ) {
    const r = await this.valoracionService.getValoracionsByIdPublicacion(
      idPublicacion,
    )
    return ResponseHandler.JSON(r)
  }

  @Get(':idUsuario/:idPublicacion')
  async getValoracionByIdUsuarioAndIdPublicacion(
    @Param('idUsuario') idUsuario: number,
    @Param('idPublicacion') idPublicacion: number,
  ) {
    const r = await this.valoracionService.getValoracionByIdUsuarioAndIdPublicacion(
      idUsuario,
      idPublicacion,
    )
    return ResponseHandler.JSON(r)
  }
}
