import { Repository } from 'typeorm'

export class CommonService<T> {
  private name: string
  repo: Repository<T>
  constructor(repo: Repository<T>, name: string) {
    this.repo = repo
    this.name = name
  }

  async save(createInput: T) {
    try {
      return await this.repo.save(createInput)
    } catch (error) {
      return undefined
    }
  }
  async insert(newInput: T) {
    const r = await this.repo.insert(newInput)
    if (r.identifiers.length > 0) {
      return true
    } else {
      return false
    }
  }
  async update(id: number, updateInput: T) {
    const r = await this.repo.update(id, updateInput)
    if (r.affected > 0) {
      return true
    } else {
      return false
    }
  }
  async delete(id: number) {
    // https://stackoverflow.com/questions/54246615/what-s-the-difference-between-remove-and-delete
    const r = await this.repo.delete(id)
    if (r.affected > 0) {
      return true
    } else {
      return false
    }
  }

  async findOneById(id: number): Promise<T> {
    const existing = await this.repo.findOne(id)
    return existing
  }
  async findAll(): Promise<T[]> {
    return await this.repo.find()
  }
}
