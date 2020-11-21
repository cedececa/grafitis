import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Result } from 'src/common/result.interface'
import { CommonService } from 'src/services/common.service'

export class CommonController<Entity, Service extends CommonService<Entity>> {
  constructor(private service: Service, private name: string) {
    this.service = service
    this.name = name
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
    const message = `Found all ${this.name} successfully`
    return {
      code: 200,
      message: message,
      data: data,
      succeed: data ? true : false,
    }
  }
}
