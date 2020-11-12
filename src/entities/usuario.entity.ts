import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ComentarioEntity } from './comentario.entity'
import { CommonEntity } from './common.entity'
import { PerfilEntity } from './perfil.entity'
import { PublicacionEntity } from './publicacion.entity'
import { ValoracionEntity } from './valoracion.entity'

@Entity('usuario')
export class UsuarioEntity extends CommonEntity {
  @Column({ nullable: true })
  role: string
  @Column()
  claveHash: string
  @Column()
  correo: string

  // Relaciones
  @OneToOne((type) => PerfilEntity, (perfil) => perfil.usuaro, {
    onDelete: 'CASCADE',
  })
  perfil: PerfilEntity

  @OneToMany((type) => ValoracionEntity, (valoracion) => valoracion.usuario, {
    nullable: true,
  })
  valoraciones: ValoracionEntity[]

  @OneToMany((type) => ComentarioEntity, (c) => c.usuario, {
    nullable: true,
  })
  comentarios: ComentarioEntity[]

  @OneToMany((type) => PublicacionEntity, (p) => p.usuario, {
    nullable: true,
  })
  publicaciones: PublicacionEntity[]
}
