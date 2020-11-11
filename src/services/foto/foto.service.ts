import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FotoEntity } from 'src/entities/Foto.entity'
import { Repository } from 'typeorm'
import { CommonService } from '../common.service'

@Injectable()
export class FotoService extends CommonService<FotoEntity> {
  constructor(
    @InjectRepository(FotoEntity)
    repo: Repository<FotoEntity>,
  ) {
    super(repo, 'foto')
  }
}
