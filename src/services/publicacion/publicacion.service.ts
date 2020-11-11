import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { Repository } from 'typeorm'
import { CommonService } from '../common.service'

@Injectable()
export class PublicacionService extends CommonService<PublicacionEntity> {
  constructor(
    @InjectRepository(PublicacionEntity)
    repo: Repository<PublicacionEntity>,
  ) {
    super(repo, 'publicacion')
  }
}
