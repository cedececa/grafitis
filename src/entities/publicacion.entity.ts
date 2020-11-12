import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ComentarioEntity } from './comentario.entity'
import { CommonEntity } from './common.entity'
import { FotoEntity } from './foto.entity'
import { UsuarioEntity } from './usuario.entity'
import { ValoracionEntity } from './valoracion.entity'

@Entity('publicacion')
export class PublicacionEntity extends CommonEntity {
  @CreateDateColumn()
  fecha: Date

  @Column({ nullable: true })
  tematica: string

  @Column({ nullable: true })
  ubicacion: string

  @Column({ nullable: true })
  estado: string

  @Column({ nullable: true })
  autor: string

  @ManyToOne((type) => UsuarioEntity, (u) => u.publicaciones, {
    nullable: true,
  })
  usuario: UsuarioEntity

  @OneToMany((type) => ValoracionEntity, (v) => v.publicacion, {
    nullable: true,
  })
  valoraciones: ValoracionEntity[]

  @OneToMany((type) => ComentarioEntity, (c) => c.publicacion, {
    nullable: true,
  })
  comentarios: ComentarioEntity[]

  @OneToMany((type) => FotoEntity, (f) => f.publicacion, {
    nullable: true,
  })
  foto: FotoEntity[]
}
