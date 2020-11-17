import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
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
  @OneToOne(() => PerfilEntity, (perfil) => perfil.usuario, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  perfil: PerfilEntity

  @OneToMany(() => ValoracionEntity, (valoracion) => valoracion.usuario, {
    nullable: true,
  })
  valoraciones: ValoracionEntity[]

  @OneToMany(() => ComentarioEntity, (c) => c.usuario, {
    nullable: true,
  })
  comentarios: ComentarioEntity[]

  @OneToMany(() => PublicacionEntity, (p) => p.usuario, {
    nullable: true,
  })
  publicaciones: PublicacionEntity[]
}
