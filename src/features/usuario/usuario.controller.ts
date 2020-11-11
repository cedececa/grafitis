import { Controller, Inject } from '@nestjs/common'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { UsuarioService } from 'src/services/usuario/usuario.service'
import { CommonController } from '../common.controller'

const name = 'usuario'
@Controller(name)
export class UsuarioController extends CommonController<
  UsuarioEntity,
  UsuarioService
> {
  constructor(@Inject(UsuarioService) service: UsuarioService) {
    super(service, name)
  }
  /* 
  @Post()
  async create(
    @Req() req: Request,
    @Body() createInput: UsuarioEntity,
  ): Promise<Result> {
    return {
      code: 200,
      message: `This ${name} is created successfully`,
      data: await this.service.create(createInput),
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInput: UsuarioEntity,
  ): Promise<Result> {
    return {
      code: 200,
      message: `This ${name} is updated successfully`,
      data: await this.service.update(id, updateInput),
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Result> {
    const data = await this.service.findOneById(id)
    const message = `Find ${name} with id ${id} successfully`
    return {
      code: 200,
      message: message,
      data: data,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return {
      code: 200,
      message: `This ${name} is deleted successfully`,
      data: await this.service.remove(id),
    }
  } */
}
