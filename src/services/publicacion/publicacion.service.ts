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
  async getPublicacionDetallada(publicacionId: number) {
    const queryBuilder = this.repo.createQueryBuilder('publicacion')
    const publicacionDetallada = await queryBuilder
      .leftJoin('publicacion.fotos', 'fotos')
      .leftJoin('publicacion.usuario', 'usuario')
      .leftJoin('usuario.perfil', 'perfil')
      .where('publicacion.id = :publicacionId', {
        publicacionId,
      })
      //seleccionamos los datos que queremos
      .select(['fotos.url', 'publicacion', 'usuario.id', 'perfil'])
      .getOne()
    return publicacionDetallada
  }
}
