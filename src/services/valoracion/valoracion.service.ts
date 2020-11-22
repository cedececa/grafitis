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

  async getValoracionByIdUsuarioAndIdPublicacion(
    idUsuario: number,
    idPublicacion: number,
  ) {
    const queryBuilder = this.repo.createQueryBuilder('valoracion')
    return await queryBuilder
      .leftJoin('valoracion.publicacion', 'publicacion')
      .leftJoin('valoracion.usuario', 'usuario', 'usuario.id = :idUsuario', {
        idUsuario,
      })
      .where('publicacion.id = :idPublicacion', { idPublicacion })

      //seleccionamos los datos que queremos
      .select(['valoracion', 'publicacion.id', 'usuario.id'])
      .getOne()
  }
  async getValoracionsByIdPublicacion(idPublicacion: number) {
    const queryBuilder = this.repo.createQueryBuilder('valoracion')
    return await queryBuilder
      .leftJoin('valoracion.publicacion', 'publicacion')
      .leftJoin('valoracion.usuario', 'usuario')
      .where('publicacion.id = :idPublicacion', { idPublicacion })

      //seleccionamos los datos que queremos
      .select(['valoracion', 'publicacion.id', 'usuario.id'])
      .getMany()
  }
  async getValoracionsByIdUsuario(idUsuario: number) {
    const queryBuilder = this.repo.createQueryBuilder('valoracion')
    return await queryBuilder
      .leftJoin('valoracion.publicacion', 'publicacion')
      .leftJoin('valoracion.usuario', 'usuario')
      .where('usuario.id = :idUsuario', { idUsuario })

      //seleccionamos los datos que queremos
      .select(['valoracion', 'publicacion.id', 'usuario.id'])
      .getMany()
  }
  async getValoracionsByIdUsuarioAndIdValoracion(
    idUsuario: number,
    idValoracion: number,
  ) {
    const queryBuilder = this.repo.createQueryBuilder('valoracion')
    return await queryBuilder
      .leftJoin('valoracion.publicacion', 'publicacion')
      .leftJoin('valoracion.usuario', 'usuario')
      .where('usuario.id = :idUsuario', { idUsuario })
      .andWhere('valoracion.id = :idValoracion', { idValoracion })

      //seleccionamos los datos que queremos
      .select(['valoracion', 'publicacion.id', 'usuario.id'])
      .getOne()
  }
}
