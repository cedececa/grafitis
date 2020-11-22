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

  async getComentariosByIdUsuario(idUsuario: number) {
    const queryBuilder = this.repo.createQueryBuilder('comentario')
    return await queryBuilder
      .leftJoin('comentario.usuario', 'usuario')
      .leftJoin('comentario.publicacion', 'publicacion')
      .where('usuario.id = :idUsuario', {
        idUsuario,
      })
      //seleccionamos los datos que queremos
      .select(['comentario', 'publicacion.id', 'usuario.id'])
      .getMany()
  }
  async deleteOneComentarioByIdUsuario(
    idUsuario: number,
    idComentario: number,
  ) {
    const queryBuilder = this.repo.createQueryBuilder('comentario')
    const r = await queryBuilder
      .leftJoin('comentario.usuario', 'usuario')
      .where('usuario.id = :idUsuario', {
        idUsuario,
      })
      .andWhere('comentario.id = :idComentario', { idComentario })
      .delete()
      .execute()
    return r.affected > 0 ? true : false
  }
}
