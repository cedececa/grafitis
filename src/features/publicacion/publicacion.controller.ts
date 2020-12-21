import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ResponseHandler } from 'src/common/response.handler'
import { Result } from 'src/common/result.interface'
import { Roles } from 'src/core/decorators/roles.decorator'
import { ComentarioEntity } from 'src/entities/comentario.entity'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { UsuarioRole } from 'src/entities/usuario-role.enum'
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
  @Get()
  @Roles(UsuarioRole.User)
  async findAll(): Promise<Result> {
    const data = await this.publicacionService.findAll()
    const message = ''
    return {
      code: 200,
      message: message,
      data: data,
      succeed: data ? true : false,
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInput: PublicacionEntity,
  ): Promise<Result> {
    //const r = await this.publicacionService.save(updateInput)
    const r = await this.publicacionService.customUpdate(id, updateInput)


    return ResponseHandler.JSON(r)
  }
  @Get('/page') //for admin app
  async getPage(
    @Query('page') page = 0,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'createdAt',
    @Query('order') order: 'DESC' | 'ASC' = 'ASC',
    @Query('searchKey') searchKey = '',
    @Query('searchValue') searchValue = '',
  ) {
    limit = limit > 40 ? 40 : limit
    return {
      code: 200,
      message: '',
      data: await this.publicacionService.paginate(
        { page, limit, route: name },
        sort,
        order,
        searchKey,
        searchValue,
      ),
    }
  }

  @Get('autor/:autor')
  @Roles(UsuarioRole.User)

  async getPublicacionesByAutor(
    @Param('autor') autor: string,
  ): Promise<Result> {
    const r = await this.publicacionService.getPublicacionesByAutor(autor)
    return {
      code: 200,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
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
  @Roles(UsuarioRole.User)
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
  @Post(':idPublicacion/:idUsuario')
  @Roles(UsuarioRole.User)
  async comment(
    @Param('idPublicacion') idPub: number,
    @Param('idUsuario') idUsuario: number,
    @Body() updateInput: ComentarioEntity,
  ): Promise<Result> {
    const r = await this.comentarioService.commentByUser(
      idPub,
      idUsuario,
      updateInput,
    )
    return {
      code: r ? 200 : 204,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }
}
