import { Body, Delete, Get, Param, Post, Put, Req } from '@nestjs/common'
import { Result } from 'src/common/result.interface'
import { CommonService } from 'src/services/common.service'
import { Request } from 'express-serve-static-core'

export class CommonController<Entity, Service extends CommonService<Entity>> {
  service: Service
  name: string
  constructor(service: Service, name: string) {
    this.service = service
    this.name = name
  }

  @Post()
  async create(
    @Req() req: Request,
    @Body() createInput: Entity,
  ): Promise<Result> {
    return {
      code: 200,
      message: `This ${this.name} is created successfully`,
      data: await this.service.create(createInput),
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInput: Entity,
  ): Promise<Result> {
    return {
      code: 200,
      message: `This ${this.name} is updated successfully`,
      data: await this.service.update(id, updateInput),
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Result> {
    const data = await this.service.findOneById(id)
    const message = `Find ${this.name} with id ${id} successfully`
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
      message: `This ${this.name} is deleted successfully`,
      data: await this.service.remove(id),
    }
  }
}
