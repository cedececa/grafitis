import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { Result } from 'src/common/result.interface'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { UsuarioService } from 'src/services/usuario/usuario.service'
import { CommonController } from '../common.controller'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { PerfilService } from 'src/services/perfil/perfil.service'
import { PerfilEntity } from 'src/entities/perfil.entity'
import { ComentarioService } from 'src/services/comentario/comentario.service'
import { ResponseHandler } from 'src/common/response.handler'
import { ValoracionService } from 'src/services/valoracion/valoracion.service'

const name = 'usuario'
@Controller(name)
export class UsuarioController extends CommonController<
  UsuarioEntity,
  UsuarioService
> {
  constructor(
    @Inject(UsuarioService) private usuarioService: UsuarioService,
    @Inject(PerfilService) private servicePerfil: PerfilService,
    @Inject(ComentarioService) private comentarioService: ComentarioService,
    @Inject(ValoracionService) private valoracionService: ValoracionService,
  ) {
    super(usuarioService, name)
  }
  /* 
  Example - override
  @Post() // overrides the base method
  async save(@Body() createInput: UsuarioEntity): Promise<Result> {
    const r = await this.usuarioService.insert(createInput)
    return {
      code: 200,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  } */

  @Post(':idUsuario/grafitis')
  async createNewGrafitis(
    @Param('idUsuario') id: number,
    @Body() createInput: PublicacionEntity,
  ): Promise<Result> {
    const created = await this.usuarioService.createNewGrafitis(id, createInput)
    return {
      code: 200,
      message: '',
      data: created,
      succeed: created ? true : false,
    }
  }

  @Delete(':idUsuario/grafitis/:idGrafitis')
  async deleteOneGrafitis(
    @Param('idUsuario') idUsuario: number,
    @Param('idGrafitis') idGrafitis: number,
  ): Promise<Result> {
    const r = await this.usuarioService.deleteOneGrafitis(idUsuario, idGrafitis)
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }

  @Put(':idUsuario/grafitis/:idGrafitis')
  async updateOneGrafitis(
    @Param('idUsuario') idUsuario: number,
    @Param('idGrafitis') idGrafitis: number,
    @Body() updateObject: PublicacionEntity,
  ): Promise<Result> {
    const r = await this.usuarioService.updateOneGrafitis(
      idUsuario,
      idGrafitis,
      updateObject,
    )
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }

  @Get(':idUsuario/grafitis/:idGrafitis')
  async getOneGrafitis(
    @Param('idUsuario') idUsuario: number,
    @Param('idGrafitis') idGrafitis: number,
  ): Promise<Result> {
    const r = await this.usuarioService.getOneGrafitis(idUsuario, idGrafitis)
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }

  // Perfil
  @Get(':idUsuario/perfil')
  async getPerfilUsuario(
    @Param('idUsuario') idUsuario: number,
  ): Promise<Result> {
    const r = await this.servicePerfil.findOneByIdUsuario(idUsuario)
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
      succeed: r ? true : false, // si r != undefined, le asigna true.
    }
  }

  // Perfil
  @Put(':idUsuario/perfil')
  async modifyPerfilUsuario(
    @Param('idUsuario') idUsuario: number,
    @Body() updateObject: PerfilEntity,
  ): Promise<Result> {
    const r = await this.servicePerfil.updateOneByIdUsuario(
      idUsuario,
      updateObject,
    )
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }

  // Comentario
  @Get(':idUsuario/comentario')
  async getComentariosDeUsuario(@Param('idUsuario') idUsuario: number) {
    const r = await this.comentarioService.getComentariosByIdUsuario(idUsuario)
    return ResponseHandler.JSON(r)
  }

  // Comentario
  @Delete(':idUsuario/comentario/:idComentario')
  async deleteOneComentariosDeUsuario(
    @Param('idUsuario') idUsuario: number,
    @Param('idComentario') idComentario: number,
  ) {
    const r = await this.comentarioService.deleteOneComentarioByIdUsuario(
      idUsuario,
      idComentario,
    )
    return ResponseHandler.JSON(r)
  }

  // Valoracion
  @Get(':idUsuario/valoracion')
  async getValoracionesDeUsuario(
    @Param('idUsuario') idUsuario: number,
  ): Promise<Result> {
    const r = await this.valoracionService.getValoracionsByIdUsuario(idUsuario)
    return ResponseHandler.JSON(r)
  }
  // Valoracion
  @Get(':idUsuario/valoracion/:idValoracion')
  async getOneValoracionByUsuarioAndValoracion(
    @Param('idUsuario') idUsuario: number,
    @Param('idValoracion') idValoracion: number,
  ): Promise<Result> {
    const r = await this.valoracionService.getValoracionsByIdUsuarioAndIdValoracion(
      idUsuario,
      idValoracion,
    )
    return ResponseHandler.JSON(r)
  }
}
