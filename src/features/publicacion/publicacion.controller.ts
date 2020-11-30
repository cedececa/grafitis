import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
} from '@nestjs/common'
import { ResponseHandler } from 'src/common/response.handler'
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
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInput: PublicacionEntity,
  ): Promise<Result> {
    //const r = await this.publicacionService.save(updateInput)
    const r = await this.publicacionService.customUpdate(id, updateInput)

    console.log(r)

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
