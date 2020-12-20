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

  async customUpdate(id: number, updateInput: PublicacionEntity) {
    let r = await this.repo.save(updateInput)
    if (r) {
      r = await this.getPublicacionDetallada(r.id)
    }
    return r
  }
  async getPublicacionDetallada(publicacionId: number) {
    const queryBuilder = this.repo.createQueryBuilder('publicacion')
    const publicacionDetallada = await queryBuilder
      .leftJoin('publicacion.usuario', 'usuario')
      .leftJoin('usuario.perfil', 'perfil')
      .where('publicacion.id = :publicacionId', {
        publicacionId,
      })
      //seleccionamos los datos que queremos
      .select(['publicacion', 'usuario.id', 'perfil'])
      .getOne()
    return publicacionDetallada
  }

  async getPublicacionesByAutor(autor: string) {
    const queryBuilder = this.repo.createQueryBuilder('publicacion')
    return await queryBuilder
      .leftJoin('publicacion.usuario', 'usuario')
      .leftJoin('usuario.perfil', 'perfil')
      .where(`LOWER(publicacion.autor) LIKE LOWER(:searchValue)`, {
        searchValue: `%${autor}%`,
      })
      //seleccionamos los datos que queremos
      .select(['publicacion', 'usuario.id', 'perfil'])
      .getMany()
  }
}
