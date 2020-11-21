import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ComentarioEntity } from 'src/entities/Comentario.entity'
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

  async getManyByPublicacionId(publicacionId: number) {
    const queryBuilder = this.repo.createQueryBuilder('comentario')
    const comentarios = await queryBuilder
      .leftJoin('comentario.publicacion', 'publicacion')
      .leftJoin('comentario.usuario', 'usuario')
      .leftJoin('usuario.perfil', 'perfil')
      .where('publicacion.id = :publicacionId', {
        publicacionId,
      })
      //seleccionamos los datos que queremos
      .select([
        'publicacion.id',
        'comentario.contenido',
        'comentario.createdAt',
        'usuario.id',
        'perfil.nombre',
      ])
      .getMany()
    return comentarios
  }
}
