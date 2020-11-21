import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerfilEntity } from 'src/entities/perfil.entity'
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

  /**
   *
   * @param idUsuario
   * si no encuentra devuele un undefined
   */
  private async getByUsuarioId(idUsuario: number): Promise<PerfilEntity> {
    const queryBuilder = this.repo.createQueryBuilder('perfil')
    const perfilEncontrado = await queryBuilder
      .leftJoin('perfil.usuario', 'usuario')
      .where('usuario.id = :idUsuario', {
        idUsuario,
      })
      //seleccionamos los datos que queremos
      .select(['usuario.id', 'perfil'])
      .getOne()
    return perfilEncontrado
  }

  async findOneByIdUsuario(idUsuario: number) {
    return await this.getByUsuarioId(idUsuario)
  }

  async updateOneByIdUsuario(idUsuario: number, updateObject: PerfilEntity) {
    let result = false

    const perfilEncontrado = await this.getByUsuarioId(idUsuario)
    if (perfilEncontrado === undefined) {
      return false
    } else {
      updateObject.usuario = perfilEncontrado.usuario
      updateObject.id = perfilEncontrado.id
      const r = await this.repo.update(updateObject.id, updateObject)
      if (r.affected > 0) {
        result = true
      } else {
        result = false
      }
    }
    return result
  }
}
