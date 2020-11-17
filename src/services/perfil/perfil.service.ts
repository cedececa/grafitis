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

  async findOneByIdUsuario(idUsuario: number) {
    const queryBuilder = this.repo.createQueryBuilder('perfil')
    return await queryBuilder
      .leftJoin('perfil.usuario', 'usuario')
      .where('usuario.id = :idUsuario', {
        idUsuario,
      })
      //selecionamos los datos que queremos
      .select(['usuario.id', 'perfil'])
      .getOne()
  }
}
