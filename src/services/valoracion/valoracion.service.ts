import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ValoracionEntity } from 'src/entities/valoracion.entity'
import { Repository } from 'typeorm'
import { CommonService } from '../common.service'

@Injectable()
export class ValoracionService extends CommonService<ValoracionEntity> {
  constructor(
    @InjectRepository(ValoracionEntity)
    repo: Repository<ValoracionEntity>,
  ) {
    super(repo, 'valoracion')
  }
}
