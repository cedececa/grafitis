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

const name = 'usuario'
@Controller(name)
export class UsuarioController extends CommonController<
  UsuarioEntity,
  UsuarioService
> {
  constructor(@Inject(UsuarioService) service: UsuarioService) {
    super(service, name)
  }
  @Post(':idUsuario/grafitis')
  async createNewGrafitis(
    @Param('idUsuario') id: number,
    @Body() createInput: PublicacionEntity,
  ): Promise<Result> {
    return {
      code: 200,
      message: `This ${name} is created successfully`,
      data: await this.service.createNewGrafitis(id, createInput),
    }
  }

  @Delete(':idUsuario/grafitis/:idGrafitis')
  async deleteOneGrafitis(
    @Param('idUsuario') idUsuario: number,
    @Param('idGrafitis') idGrafitis: number,
  ): Promise<Result> {
    const r = await this.service.deleteOneGrafitis(idUsuario, idGrafitis)
    return {
      code: r ? 200 : 204,
      message: r
        ? `This ${name} is deleted successfully.`
        : `This ${name} does't exist.`,
      data: r,
    }
  }

  @Put(':idUsuario/grafitis/:idGrafitis')
  async updateOneGrafitis(
    @Param('idUsuario') idUsuario: number,
    @Param('idGrafitis') idGrafitis: number,
    @Body() updateObject: PublicacionEntity,
  ): Promise<Result> {
    const r = await this.service.updateOneGrafitis(
      idUsuario,
      idGrafitis,
      updateObject,
    )
    return {
      code: r ? 200 : 204,
      message: r
        ? `This ${name} is updated successfully.`
        : `Update operation is failed. Try it later.`,
      data: r,
    }
  }

  @Get(':idUsuario/grafitis/:idGrafitis')
  async getOneGrafitis(
    @Param('idUsuario') idUsuario: number,
    @Param('idGrafitis') idGrafitis: number,
  ): Promise<Result> {
    const r = await this.service.getOneGrafitis(idUsuario, idGrafitis)
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
    }
  }
}
