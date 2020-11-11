import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerfilEntity } from 'src/entities/Perfil.entity'
import { Repository } from 'typeorm'
import { CommonService } from '../common.service'

@Injectable()
export class PerfilService extends CommonService<PerfilEntity> {
  constructor(
    @InjectRepository(PerfilEntity)
    repo: Repository<PerfilEntity>,
  ) {
    super(repo, 'perfil')
  }
}
