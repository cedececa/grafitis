import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ComentarioEntity } from 'src/entities/comentario.entity'
import { Repository } from 'typeorm'
import { CommonService } from '../common.service'

@Injectable()
export class ComentarioService extends CommonService<ComentarioEntity> {
  constructor(
    @InjectRepository(ComentarioEntity)
    repo: Repository<ComentarioEntity>,
  ) {
    super(repo, 'comentario')
  }
}
