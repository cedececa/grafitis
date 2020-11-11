import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { Repository } from 'typeorm'
import { CommonService } from '../common.service'

@Injectable()
export class UsuarioService extends CommonService<UsuarioEntity> {
  constructor(
    @InjectRepository(UsuarioEntity)
    repo: Repository<UsuarioEntity>,
  ) {
    super(repo, 'usuario')
  }
  /* 
  async create(createInput: UsuarioEntity) {
    return await this.repo.save(createInput)
  }
  async update(id: number, updateInput: UsuarioEntity) {
    const existing = await this.findOneById(id)
    if (updateInput) updateInput.id = existing.id
    return await this.repo.save(updateInput)
  }
  async remove(id: number) {
    const existing = await this.findOneById(id)
    return await this.repo.remove(existing)
  }
  async findOneById(id: number): Promise<UsuarioEntity> {
    const existing = await this.repo.findOne(id)
    if (!existing)
      throw new HttpException(
        `Failed, the ${name} with ${id} does not exist`,
        404,
      )
    return existing
  }
  async findAll(): Promise<UsuarioEntity[]> {
    return await this.repo.find()
  } */
}
