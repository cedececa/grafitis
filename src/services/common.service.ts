import { HttpException } from '@nestjs/common'
import { Repository } from 'typeorm'

export class CommonService<T> {
  private name: string
  private repo: Repository<T>
  constructor(repo: Repository<T>, name: string) {
    this.repo = repo
    this.name = name
  }

  async create(createInput: T) {
    return await this.repo.save(createInput)
  }
  async update(id: number, updateInput: T) {
    await this.findOneById(id)
    return await this.repo.save(updateInput)
  }
  async remove(id: number) {
    const existing = await this.findOneById(id)
    return await this.repo.remove(existing)
  }
  async findOneById(id: number): Promise<T> {
    const existing = await this.repo.findOne(id)
    if (!existing)
      throw new HttpException(
        `Failed, the ${this.name} with ${id} does not exist`,
        404,
      )
    return existing
  }
  async findAll(): Promise<T[]> {
    return await this.repo.find()
  }
}
