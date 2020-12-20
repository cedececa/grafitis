import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { Repository } from 'typeorm'
import { CommonService } from '../common.service'

@Injectable()
export class UsuarioService extends CommonService<UsuarioEntity> {
  constructor(
    @InjectRepository(UsuarioEntity)
    repo: Repository<UsuarioEntity>,
    @InjectRepository(PublicacionEntity)
    private readonly repoPublicacion: Repository<PublicacionEntity>,
  ) {
    super(repo, 'usuario')
  }

  async getUsuarioInDetailById(idUsuario: number | string) {
    const queryBuilder = this.repo.createQueryBuilder('usuario')
    return await queryBuilder

      .leftJoin('usuario.perfil', 'perfil')
      .where('usuario.id = :idUsuario', {
        idUsuario,
      })
      //selecionamos los datos que queremos
      .select(['usuario', 'perfil'])
      .getOne()
  }
  async createNewGrafitis2(createInput: PublicacionEntity) {
    return await this.repoPublicacion.save(createInput)
  }
  async createNewGrafitis(idUsuario: number, createInput: PublicacionEntity) {
    //const usuario = await this.findOneById(idUsuario)
    const usuario = await this.repo.findOne({
      where: { id: idUsuario },
      select: ['id'], // seleccionamos los campos que devuelve para evitar dato grande
    })
    createInput.usuario = usuario
    return await this.repoPublicacion.save(createInput)
  }

  async updateOneGrafitis(
    idUsuario: number,
    idPublicacion: number,
    updateObject: PublicacionEntity,
  ) {
    //const usuario = await this.findOneById(idUsuario)
    let publicacion: PublicacionEntity = undefined
    publicacion = await this.repoPublicacion.findOne({
      where: { id: idPublicacion },
      select: ['id'], // seleccionamos los campos que devuelve para evitar dato grande
      relations: ['usuario'],
    })

    // si es del usuario loguequado
    let result = null
    let r = false
    if (
      publicacion !== undefined &&
      publicacion.usuario !== undefined &&
      publicacion.usuario.id == idUsuario // cuidado con la comparacion.
    ) {
      result = await this.repoPublicacion.update(idPublicacion, updateObject)
    }

    if (result !== null && result.affected > 0) {
      r = true
    }

    return r
  }

  async deleteOneGrafitis(idUsuario: number, idPublicacion: number) {
    //const usuario = await this.findOneById(idUsuario)
    let publicacion: PublicacionEntity = undefined
    publicacion = await this.repoPublicacion.findOne({
      where: { id: idPublicacion },
      select: ['id'], // seleccionamos los campos que devuelve para evitar dato grande
      relations: ['usuario'],
    })

    // aqui deberia cambiar posteriormente porque deberia comparar el id de usuario logqueado
    // para hacer esto, habria que haber implementado auth.
    let result = null
    let deleted = false
    if (
      publicacion !== undefined &&
      publicacion.usuario !== undefined &&
      publicacion.usuario.id == idUsuario // cuidado con la comparacion.
    ) {
      result = await this.repoPublicacion.remove(publicacion)
    }

    if (result !== null) {
      deleted = true
    }

    return deleted
  }

  async exists(idEntity: number): Promise<UsuarioEntity> {
    return await this.repo.findOne({
      where: { id: idEntity },
      select: ['id'], // seleccionamos los campos que devuelve para evitar dato grande
    })
  }

  async getOneGrafitis(idUsuario: number, idPublicacion: number) {
    const queryBuilder = this.repoPublicacion.createQueryBuilder('publicacion')
    return await queryBuilder

      .leftJoin('publicacion.usuario', 'usuario')
      .where('publicacion.id = :idPublicacion', {
        idPublicacion,
      })
      .andWhere('usuario.Id = :idUsuario', {
        idUsuario,
      })
      //selecionamos los datos que queremos
      .select(['usuario.id', 'publicacion'])
      .getOne()
  }
  async getAllGrafitisByUsuario(idUsuario: number) {
    const queryBuilder = this.repoPublicacion.createQueryBuilder('publicacion')
    return await queryBuilder

      .leftJoin('publicacion.usuario', 'usuario')
      .where('usuario.Id = :idUsuario', {
        idUsuario,
      })
      //selecionamos los datos que queremos
      .select(['usuario.id', 'publicacion'])
      .getMany()
  }

  async findOneByEmail(email: string): Promise<UsuarioEntity> {
    return await this.repo
      .createQueryBuilder('usuario')
      .where('usuario.email = :email', {
        email: email,
      })
      .leftJoin('usuario.perfil', 'perfil')
      .select(['usuario', 'perfil'])
      .getOne()
  }
}
