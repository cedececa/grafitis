import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { Result } from 'src/common/result.interface'
import { CommonEntity } from 'src/entities/common.entity'
import { CommonService } from 'src/services/common.service'

export class CommonController<Entity extends CommonEntity, Service extends CommonService<Entity>> {
  constructor(private service: Service, private name: string) {
    this.service = service
    this.name = name
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
      data: await this.service.paginate(
        { page, limit, route: this.name },
        sort,
        order,
        searchKey,
        searchValue,
      ),
    }
  }
  @Post()
  async save(@Body() createInput: Entity): Promise<Result> {
    const r = await this.service.save(createInput)
    return {
      code: 200,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInput: Entity,
  ): Promise<Result> {

    const existing = await this.service.findOneById(updateInput.id)
    updateInput.createdAt = existing.createdAt
    updateInput.updatedAt = new Date()
    const r = await this.service.update(id, updateInput)
    return {
      code: 200,
      message: 'id: ' + id,
      data: updateInput,
      succeed: r ? true : false,
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Result> {
    const r = await this.service.findOneById(id)
    return {
      code: 200,
      message: 'id: ' + id,
      data: r,
      succeed: r ? true : false,
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Result> {
    const r = await this.service.delete(id)
    return {
      code: 200,
      message: '',
      data: r,
      succeed: r ? true : false,
    }
  }

  @Get()
  async findAll(): Promise<Result> {
    const data = await this.service.findAll()
    const message = ''
    return {
      code: 200,
      message: message,
      data: data,
      succeed: data ? true : false,
    }
  }
}
